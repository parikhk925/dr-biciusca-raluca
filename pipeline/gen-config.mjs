// Converts one lead JSON file into a config/clinic.ts source string compatible
// with the existing ClinicConfig type. No fabricated facts: every field here
// traces back to the lead JSON, which itself only contains CSV-supplied or
// independently verified public information.
import { readFileSync } from "node:fs";

export const SERVICE_ICON = {
  "General Dentistry": "tooth",
  "Family Dentistry": "tooth",
  "Cosmetic Dentistry": "whitening",
  "Restorative Dentistry": "crown",
  "Dental Implants": "surgery",
  "Check-ups": "tooth",
  "Dental Hygiene": "cleaning",
  Fillings: "tooth",
  "Crowns & Bridges": "crown",
  Dentures: "crown",
  "Teeth Whitening": "whitening",
  "Root Canal Treatment": "root-canal",
  "Oral Surgery": "surgery",
  "General Dental Surgery": "surgery",
  "Minor Oral Surgery": "surgery",
  "Domiciliary Care": "stethoscope",
  "Cosmetic Braces": "braces",
  Orthodontics: "braces",
  Invisalign: "braces",
  "Composite Bonding": "whitening",
  Extractions: "surgery",
};

export const SERVICE_DESCRIPTION = {
  "General Dentistry": "Routine check-ups and everyday dental care for patients of all ages.",
  "Family Dentistry": "Dental care for the whole family, from routine check-ups to more involved treatment.",
  "Cosmetic Dentistry": "Treatments focused on the appearance of your smile.",
  "Restorative Dentistry": "Treatment to repair and restore damaged or missing teeth.",
  "Dental Implants": "A long-term option for replacing missing teeth.",
  "Check-ups": "Regular examinations to catch issues early.",
  "Dental Hygiene": "Professional cleaning to support healthy teeth and gums.",
  Fillings: "Treatment for cavities using tooth-coloured or traditional materials.",
  "Crowns & Bridges": "Restorations for damaged or missing teeth.",
  Dentures: "Removable replacements for missing teeth.",
  "Teeth Whitening": "Professional whitening to brighten your smile.",
  "Root Canal Treatment": "Treatment to save a tooth affected by infection or inflammation.",
  "Oral Surgery": "Surgical procedures including extractions, carried out with patient comfort in mind.",
  "General Dental Surgery": "General surgical dental procedures.",
  "Minor Oral Surgery": "Minor surgical procedures carried out in practice.",
  "Domiciliary Care": "Dental care provided for patients who are unable to visit the practice.",
  "Cosmetic Braces": "Discreet orthodontic options for straightening teeth.",
  Orthodontics: "Treatment to straighten and align teeth.",
  Invisalign: "Clear aligners for straightening teeth.",
  "Composite Bonding": "A conservative option for improving the shape or colour of teeth.",
  Extractions: "Removal of teeth that cannot be saved or are causing problems.",
};

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function tsString(s) {
  return JSON.stringify(s ?? "");
}

function tsArrayOfStrings(arr) {
  if (!arr || arr.length === 0) return "[]";
  return `[${arr.map(tsString).join(", ")}]`;
}

export function loadLead(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

export function buildClinicConfigSource(lead) {
  const businessName = lead.businessName;
  const city = lead.city;
  const country = lead.country ?? "United Kingdom";

  const practitionersTs = (lead.practitioners ?? [])
    .map((p, i) => {
      const id = slugify(p.name);
      const fields = [
        `id: ${tsString(id)}`,
        `name: ${tsString(p.name)}`,
        p.title ? `title: ${tsString(p.title)}` : null,
        p.specialty ? `specialty: ${tsString(p.specialty)}` : null,
        p.qualifications ? `qualifications: ${tsArrayOfStrings(p.qualifications)}` : null,
        p.experienceYears ? `experienceYears: ${p.experienceYears}` : null,
        p.shortBio ? `shortBio: ${tsString(p.shortBio)}` : null,
        i === 0 && (lead.practitioners ?? []).length > 1 ? `featured: true` : null,
      ].filter(Boolean);
      return `    {\n      ${fields.join(",\n      ")},\n    }`;
    })
    .join(",\n");

  const servicesTs = (lead.services ?? [])
    .map((name) => {
      const id = slugify(name);
      const icon = SERVICE_ICON[name];
      const desc = SERVICE_DESCRIPTION[name] ?? lead.ai?.serviceDescriptions?.[name];
      const fields = [
        `id: ${tsString(id)}`,
        `slug: ${tsString(id)}`,
        `name: ${tsString(name)}`,
        desc ? `shortDescription: ${tsString(desc)}` : null,
        icon ? `icon: ${tsString(icon)}` : null,
      ].filter(Boolean);
      return `    {\n      ${fields.join(",\n      ")},\n    }`;
    })
    .join(",\n");

  const hoursTs = (lead.openingHours ?? [])
    .map((h) => `    { days: ${tsString(h.days)}, hours: ${tsString(h.hours)} }`)
    .join(",\n");

  const socialEntries = Object.entries(lead.social ?? {}).filter(([, v]) => Boolean(v));
  const socialTs = socialEntries.map(([k, v]) => `    ${k}: ${tsString(v)},`).join("\n");

  const practitionerCount = (lead.practitioners ?? []).length;

  // Every field below prefers AI-generated copy (lead.ai.*, produced by
  // pipeline/ai-copy.mjs and cached onto the lead JSON) and falls back to a
  // deterministic template built only from verified facts when the AI step
  // was skipped, unavailable, or failed. Either way, no fact is invented —
  // the AI is constrained to phrase only what's already in the lead JSON.
  const heroHeadline = lead.ai?.heroHeadline ?? "Quality dental care, close to home.";
  const heroDescription =
    lead.ai?.heroDescription ??
    (practitionerCount === 1
      ? `Dental care from ${lead.practitioners[0].name} and the team in ${city}.`
      : `Comfortable, patient-focused dental care in ${city}.`);

  const aboutHeading = lead.ai?.aboutHeading ?? `Dental care for patients in ${city},`;
  const aboutSupporting =
    lead.ai?.aboutSupporting ??
    (practitionerCount > 0
      ? `provided by ${businessName}'s team.`
      : `provided by the team at ${businessName}.`);

  const ratingBlock = lead.rating
    ? `\n  rating: { score: ${tsString(String(lead.rating))}, basedOn: ${lead.reviewCount ?? 0} },`
    : "";

  const seoTitle = lead.ai?.seoTitle ?? `${businessName} | Dentist in ${city}`;
  const seoDescription =
    lead.ai?.seoDescription ??
    (() => {
      const parts = [`${businessName} is a dental practice in ${city}, ${country}`];
      if (lead.rating) parts.push(`rated ${lead.rating}/5 by patients`);
      return parts.join(", ") + ".";
    })();

  const contactFields = [
    `    phone: ${tsString(lead.phone)}`,
    lead.whatsapp ? `    whatsapp: ${tsString(lead.whatsapp)}` : null,
    `    email: ${tsString(lead.email)}`,
    lead.address ? `    address: ${tsString(lead.address)}` : null,
    `    city: ${tsString(city)}`,
    `    country: ${tsString(country)}`,
    lead.postalCode ? `    postalCode: ${tsString(lead.postalCode)}` : null,
    lead.googleMapsUrl ? `    googleMapsUrl: ${tsString(lead.googleMapsUrl)}` : null,
    typeof lead.latitude === "number" ? `    latitude: ${lead.latitude}` : null,
    typeof lead.longitude === "number" ? `    longitude: ${lead.longitude}` : null,
  ].filter((f) => f && !f.endsWith("null"));

  return `import type { ClinicConfig } from "./types";

// Auto-generated by pipeline/gen-config.mjs from pipeline/leads/${lead.slug}.json.
// Every fact here traces back to CSV data or independently verified public
// sources — nothing here is invented. Do not hand-edit; regenerate instead.
export const clinic: ClinicConfig = {
  business: {
    name: ${tsString(businessName)},
    type: "dentist",
  },

  practitioners: [
${practitionersTs}
  ],

  branding: {},

  hero: {
    headline: ${tsString(heroHeadline)},
    description: ${tsString(heroDescription)},
    primaryCTA: "Get in Touch",
    secondaryCTA: "Call Now",
  },

  about: {
    heading: ${tsString(aboutHeading)},
    supportingText: ${tsString(aboutSupporting)},
  },

  contact: {
${contactFields.join(",\n")}
  },
${lead.openingHours ? `\n  openingHours: [\n${hoursTs}\n  ],\n` : ""}
  services: [
${servicesTs}
  ],
${ratingBlock}
  social: {
${socialTs}
  },

  seo: {
    title: ${tsString(seoTitle)},
    description: ${tsString(seoDescription)},
  },

  appointment: {
    enabled: true,
    allowPractitionerSelection: false,
  },
};
`;
}
