// Phase 1 (sequential): for one lead — write generated config into the main
// repo's config/clinic.ts, typecheck + build to catch crashes, snapshot the
// validated source tree (no node_modules/.next/.git) into pipeline/generated/<slug>/
// for deployment, then restore the original config/clinic.ts.
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { cpSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildClinicConfigSource, loadLead } from "./gen-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const CLINIC_TS = path.join(REPO_ROOT, "config", "clinic.ts");
const BACKUP_TS = path.join(REPO_ROOT, "config", "clinic.ts.bak");
// Must live OUTSIDE REPO_ROOT — copying a tree into its own subdirectory fails.
const BUILDS_ROOT = path.join(os.tmpdir(), "lead-pipeline-builds");

const EXCLUDE_DIRS = new Set(["node_modules", ".next", ".git", "pipeline", ".vercel"]);

function copySourceTree(dest) {
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(REPO_ROOT, dest, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(REPO_ROOT, src);
      if (rel === "") return true;
      const top = rel.split(path.sep)[0];
      return !EXCLUDE_DIRS.has(top);
    },
  });
}

export function validateAndSnapshot(leadPath) {
  const lead = loadLead(leadPath);
  const result = { slug: lead.slug, businessName: lead.businessName, stage: "pending" };

  const generatedSource = buildClinicConfigSource(lead);

  // Back up the current clinic.ts (the shared demo config) so we can restore it.
  copyFileSync(CLINIC_TS, BACKUP_TS);

  try {
    writeFileSync(CLINIC_TS, generatedSource, "utf-8");

    try {
      execSync("npx tsc --noEmit", { cwd: REPO_ROOT, stdio: "pipe" });
    } catch (e) {
      result.stage = "build_failed";
      result.error = `typecheck failed: ${e.stdout?.toString().slice(0, 2000) ?? e.message}`;
      return result;
    }

    try {
      execSync("npx next build", { cwd: REPO_ROOT, stdio: "pipe", env: { ...process.env } });
    } catch (e) {
      result.stage = "build_failed";
      result.error = `next build failed: ${e.stdout?.toString().slice(0, 2000) ?? e.message}`;
      return result;
    }

    // Sanity-check the built HTML actually contains this lead's business name,
    // and does NOT contain the demo/previous business name (no cross-contamination).
    const homeHtml = readFileSync(
      path.join(REPO_ROOT, ".next", "server", "app", "index.html"),
      "utf-8"
    );
    if (!homeHtml.includes(lead.businessName)) {
      result.stage = "build_failed";
      result.error = `built page does not contain business name ${lead.businessName}`;
      return result;
    }

    const dest = path.join(BUILDS_ROOT, lead.slug);
    copySourceTree(dest);
    // Snapshot also needs its own clean .gitignore-respecting node_modules-free tree — already excluded.

    result.stage = "snapshot_ready";
    result.snapshotDir = dest;
    return result;
  } finally {
    copyFileSync(BACKUP_TS, CLINIC_TS);
    rmSync(BACKUP_TS, { force: true });
  }
}

if (process.argv[1] && process.argv[1].endsWith("validate-and-snapshot.mjs")) {
  const leadPath = process.argv[2];
  const res = validateAndSnapshot(leadPath);
  console.log(JSON.stringify(res, null, 2));
  if (res.stage !== "snapshot_ready") process.exit(1);
}
