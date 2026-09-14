// Orchestrator: Phase 2 (concurrency-limited deploy+verify) + incremental CSV
// output + resumable state.json. Phase 1 (validate-and-snapshot) is assumed
// to have already run for every lead in pipeline/leads/*.json.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deployAndVerify } from "./deploy-and-verify.mjs";
import { loadLead } from "./gen-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEADS_DIR = path.join(__dirname, "leads");
const OUTPUT_DIR = path.join(__dirname, "output");
const STATE_PATH = path.join(OUTPUT_DIR, "state.json");
const CSV_PATH = path.join(OUTPUT_DIR, "dental_personalized_websites.csv");
const CONCURRENCY = 2;

const CSV_HEADER =
  "business_name,whatsapp_number,email,city,country,google_maps_listing_url,rating,review_count,practitioner_names,preview_url,personalised_outreach_message,status";

function csvField(v) {
  const s = v === null || v === undefined ? "" : String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function loadState() {
  if (existsSync(STATE_PATH)) return JSON.parse(readFileSync(STATE_PATH, "utf-8"));
  return {};
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function buildOutreachMessage(lead, previewUrl) {
  const opener = lead.outreachNote
    ? `I came across your dental practice in ${lead.city} and noticed you have ${
        lead.outreachNote === "existing placeholder page, not a full website"
          ? "only a placeholder page rather than a full website"
          : "no dedicated website"
      }.`
    : `I came across your dental practice in ${lead.city}.`;

  return (
    `Hi ${lead.businessName},\n\n` +
    `${opener}\n\n` +
    `We went ahead and prepared a modern website preview specifically for your practice:\n\n` +
    `${previewUrl}\n\n` +
    `It's tailored around your clinic, services and contact information.\n\n` +
    `There's no advance payment — you can see the complete website first and only pay if you genuinely like it.\n\n` +
    `Would you like me to send over the details? 😊`
  );
}

function rewriteCsv(rows) {
  const lines = [CSV_HEADER];
  for (const r of rows) {
    lines.push(
      [
        r.business_name,
        r.whatsapp_number,
        r.email,
        r.city,
        r.country,
        r.google_maps_listing_url,
        r.rating,
        r.review_count,
        r.practitioner_names,
        r.preview_url,
        r.personalised_outreach_message,
        r.status,
      ]
        .map(csvField)
        .join(",")
    );
  }
  writeFileSync(CSV_PATH, lines.join("\n") + "\n", "utf-8");
}

async function processLead(leadFile, state) {
  const lead = loadLead(path.join(LEADS_DIR, leadFile));
  const existing = state[lead.slug];

  if (existing && existing.status === "deployed" && existing.preview_url) {
    console.log(`[skip] ${lead.slug} already deployed at ${existing.preview_url}`);
    return existing;
  }

  console.log(`[deploy] ${lead.slug} starting...`);
  const res = await deployAndVerify(lead.slug, lead.businessName, lead.city);

  const row = {
    business_name: lead.businessName,
    whatsapp_number: lead.whatsapp ?? "",
    email: lead.email ?? "",
    city: lead.city,
    country: lead.country,
    google_maps_listing_url: lead.googleMapsUrl ?? "",
    rating: lead.rating ?? "",
    review_count: lead.reviewCount ?? "",
    practitioner_names: (lead.practitioners ?? []).map((p) => p.name).join(" | "),
    preview_url: res.stage === "deployed" ? res.previewUrl : "",
    personalised_outreach_message:
      res.stage === "deployed" ? buildOutreachMessage(lead, res.previewUrl) : "",
    status: res.stage,
    error: res.error ?? undefined,
  };

  state[lead.slug] = row;
  saveState(state);
  rewriteCsv(Object.values(state));

  console.log(`[${row.status}] ${lead.slug}${res.error ? " — " + res.error : ""}`);
  return row;
}

async function runWithConcurrency(items, limit, worker) {
  const results = [];
  let i = 0;
  async function next() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, next));
  return results;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const state = loadState();
  const leadFiles = readdirSync(LEADS_DIR).filter((f) => f.endsWith(".json"));

  await runWithConcurrency(leadFiles, CONCURRENCY, (f) => processLead(f, state));

  const rows = Object.values(state);
  rewriteCsv(rows); // always resync the CSV with final state, even for skipped/resumed leads
  const summary = {
    total: rows.length,
    deployed: rows.filter((r) => r.status === "deployed").length,
    missing_contact: rows.filter((r) => r.status === "missing_contact").length,
    build_failed: rows.filter((r) => r.status === "build_failed").length,
    deploy_failed: rows.filter((r) => r.status === "deploy_failed").length,
    verification_failed: rows.filter((r) => r.status === "verification_failed").length,
  };

  console.log("\n=== BATCH SUMMARY ===");
  console.log(`Total leads: ${summary.total}`);
  console.log(`Successfully deployed: ${summary.deployed}`);
  console.log(`Missing contact information: ${summary.missing_contact}`);
  console.log(`Build failures: ${summary.build_failed}`);
  console.log(`Deployment failures: ${summary.deploy_failed}`);
  console.log(`Verification failures: ${summary.verification_failed}`);
  console.log(`\nOutput CSV: ${CSV_PATH}`);
}

main();
