// Enrichment step: fills lead.ai with AI-generated copy, caching the result
// back onto the lead JSON so reruns don't re-spend tokens. Purely additive —
// if it's skipped or fails, gen-config.mjs's deterministic fallback covers it.
import { readFileSync, writeFileSync } from "node:fs";
import { aiEnabled, generateSiteCopy } from "./ai-copy.mjs";

export async function enrichLead(leadPath, { force = false } = {}) {
  const lead = JSON.parse(readFileSync(leadPath, "utf-8"));

  if (lead.ai && !force) return lead;
  if (!aiEnabled) return lead;

  try {
    lead.ai = await generateSiteCopy(lead);
    writeFileSync(leadPath, JSON.stringify(lead, null, 2) + "\n", "utf-8");
    console.log(`[ai] enriched ${lead.slug}`);
  } catch (e) {
    console.warn(`[ai] copy generation failed for ${lead.slug}, using deterministic fallback: ${e.message}`);
  }
  return lead;
}

if (process.argv[1] && process.argv[1].endsWith("enrich-lead.mjs")) {
  const leadPath = process.argv[2];
  const force = process.argv.includes("--force");
  const lead = await enrichLead(leadPath, { force });
  console.log(JSON.stringify(lead.ai ?? { note: "no AI copy (disabled, cached, or failed)" }, null, 2));
}
