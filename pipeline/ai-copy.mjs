// Optional AI copywriting layer, wired to NVIDIA's NIM (OpenAI-compatible)
// API. Every prompt is constrained to only phrase facts the lead JSON
// already contains — the model is never allowed to invent names, numbers,
// dates, awards, or claims. If NVIDIA_API_KEY isn't set, or a call fails,
// callers fall back to the deterministic templates in gen-config.mjs — the
// pipeline never blocks on this being unavailable.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SERVICE_DESCRIPTION } from "./gen-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvFile();

const API_KEY = process.env.NVIDIA_API_KEY;
const MODEL = process.env.NVIDIA_MODEL || "meta/llama-3.1-8b-instruct";
const ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";

export const aiEnabled = Boolean(API_KEY);

const FACT_GUARD = `You are a copywriter for a website-generation pipeline for UK dental practices.
STRICT RULES:
- Only use the facts given in the user message. Never invent names, numbers, dates, awards, years of experience, qualifications, prices, or claims not explicitly provided.
- No exaggerated marketing claims: avoid "world-class", "best", "number one", "guaranteed", superlatives.
- Professional, reassuring, premium, concise, natural British English.
- Output ONLY a single valid JSON object. No markdown code fences, no commentary, no leading/trailing text.`;

async function callNvidia(userPrompt, { maxTokens = 700, temperature = 0.4 } = {}) {
  if (!API_KEY) throw new Error("NVIDIA_API_KEY not set");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: FACT_GUARD },
          { role: "user", content: userPrompt },
        ],
        max_tokens: maxTokens,
        temperature,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`NVIDIA API ${res.status}: ${text.slice(0, 500)}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? "";
  } finally {
    clearTimeout(timeout);
  }
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`no JSON object found in AI response: ${text.slice(0, 300)}`);
  return JSON.parse(match[0]);
}

/** One call per lead: generates hero/about/SEO copy plus descriptions only
 * for services not already covered by the free deterministic dictionary
 * (keeps token usage down — most common services never need an AI call). */
export async function generateSiteCopy(lead) {
  const unknownServices = (lead.services ?? []).filter((s) => !SERVICE_DESCRIPTION[s]);

  const facts = {
    businessName: lead.businessName,
    city: lead.city,
    country: lead.country,
    services: lead.services ?? [],
    practitioners: (lead.practitioners ?? []).map((p) => ({
      name: p.name,
      title: p.title,
      specialty: p.specialty,
    })),
    rating: lead.rating ?? null,
    reviewCount: lead.reviewCount ?? null,
    servicesNeedingDescriptions: unknownServices,
  };

  const userPrompt = `Facts (JSON):
${JSON.stringify(facts, null, 2)}

Return a JSON object with exactly these keys:
{
  "heroHeadline": "short reassuring headline, max 8 words, must not include the business name",
  "heroDescription": "one sentence, naturally mentions the city",
  "aboutHeading": "one short sentence introducing the practice, ending with a comma (it's the first half of a two-part sentence)",
  "aboutSupporting": "one short sentence completing that thought, may mention the practice by name or 'the team'",
  "seoTitle": "${lead.businessName} | Dentist in ${lead.city}",
  "seoDescription": "one factual sentence about the practice, may mention the rating only if a rating value was given",
  "serviceDescriptions": { "<exact service name>": "one short factual sentence" — one entry for EVERY name listed in servicesNeedingDescriptions, and no other keys }
}`;

  const raw = await callNvidia(userPrompt, { maxTokens: 700 });
  return extractJson(raw);
}

/** One call per successfully deployed lead: writes the outreach message
 * using the real, verified preview URL. Never called before a URL exists. */
export async function generateOutreachMessage(lead, previewUrl) {
  const facts = {
    businessName: lead.businessName,
    city: lead.city,
    rating: lead.rating ?? null,
    reviewCount: lead.reviewCount ?? null,
    outreachNote: lead.outreachNote ?? null,
    previewUrl,
  };

  const userPrompt = `Facts (JSON):
${JSON.stringify(facts, null, 2)}

Write a short outreach message to this dental practice's owner. Structure, as separate paragraphs joined by "\\n\\n":
1. "Hi <businessName>,"
2. One sentence: found their practice in <city>. If outreachNote is "existing placeholder page, not a full website", say they have only a placeholder page rather than a full site; if it's "no dedicated website" or null, say they don't currently have a dedicated website.
3. One sentence: prepared a modern website preview tailored to their clinic, services and contact information.
4. The exact previewUrl on its own line, unchanged.
5. One sentence: no advance payment, they only pay if they genuinely like it.
6. A closing question inviting them to hear more, ending with exactly one 😊 emoji.

Return a JSON object: {"message": "<the full message>"}`;

  const raw = await callNvidia(userPrompt, { maxTokens: 400, temperature: 0.5 });
  const parsed = extractJson(raw);
  if (!parsed.message || !parsed.message.includes(previewUrl)) {
    throw new Error("AI outreach message missing the preview URL");
  }
  return parsed.message;
}
