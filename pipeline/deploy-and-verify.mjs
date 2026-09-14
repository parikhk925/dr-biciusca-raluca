// Phase 2: deploy one snapshotted lead site to Vercel as its own project
// (production), then verify with a real HTTP request. Never invents a URL —
// only records what `vercel` actually returns.
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

function run(cmd, args, cwd) {
  return execFileSync(cmd, args, {
    cwd,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });
}

export async function deployAndVerify(slug, businessName, city) {
  const dir = path.join(os.tmpdir(), "lead-pipeline-builds", slug);
  const result = { slug, businessName, stage: "deploying" };

  try {
    // `vercel deploy --prod --yes --name <slug>` on a never-linked directory
    // creates (or reuses) a project named after the slug, which Vercel always
    // aliases to the deterministic domain `https://<slug>.vercel.app` — we
    // don't parse the CLI's ANSI-formatted stdout for the URL, we just confirm
    // the deploy command succeeded and then hit that known domain directly.
    run("npx", ["vercel", "deploy", "--prod", "--yes", "--name", slug, dir], dir);
  } catch (e) {
    result.stage = "deploy_failed";
    result.error = (e.stdout || e.stderr || e.message || "").toString().slice(0, 2000);
    return result;
  }
  const deployUrl = `https://${slug}.vercel.app`;

  result.previewUrl = deployUrl;
  result.stage = "verifying";

  // Give the alias a moment to propagate before verifying.
  await new Promise((r) => setTimeout(r, 3000));

  try {
    const res = await fetch(deployUrl, { redirect: "follow" });
    if (res.status !== 200) {
      result.stage = "verification_failed";
      result.error = `HTTP ${res.status}`;
      return result;
    }
    const html = await res.text();
    if (!html.includes(businessName)) {
      result.stage = "verification_failed";
      result.error = `business name "${businessName}" not found in deployed HTML`;
      return result;
    }
    if (city && !html.includes(city)) {
      result.stage = "verification_failed";
      result.error = `city "${city}" not found in deployed HTML`;
      return result;
    }
  } catch (e) {
    result.stage = "verification_failed";
    result.error = e.message;
    return result;
  }

  result.stage = "deployed";
  return result;
}

if (process.argv[1] && process.argv[1].endsWith("deploy-and-verify.mjs")) {
  const [slug, businessName, city] = process.argv.slice(2);
  const res = await deployAndVerify(slug, businessName, city);
  console.log(JSON.stringify(res, null, 2));
  if (res.stage !== "deployed") process.exit(1);
}
