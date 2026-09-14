import type { ClinicConfig, Practitioner } from "@/config/types";

/** Map our business.type to the closest schema.org type. Kept intentionally
 * small — never invent a more specific type than the data actually supports. */
function schemaType(clinic: ClinicConfig): string {
  switch (clinic.business.type) {
    case "dentist":
      return "Dentist";
    case "doctor":
      return "Physician";
    case "medical":
      return "MedicalClinic";
    case "clinic":
    default:
      return "MedicalBusiness";
  }
}

function practitionerNode(clinic: ClinicConfig, p: Practitioner) {
  const node: Record<string, unknown> = {
    "@type": clinic.business.type === "doctor" || clinic.business.type === "dentist"
      ? "Physician"
      : "Person",
    name: p.name,
  };
  if (p.title) node.jobTitle = p.title;
  if (p.specialty) node.medicalSpecialty = p.specialty;
  if (p.image) node.image = absoluteUrl(clinic, p.image);
  return node;
}

function absoluteUrl(clinic: ClinicConfig, path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = clinic.seo.siteUrl?.replace(/\/$/, "") ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Build the JSON-LD structured data object for the clinic. Only includes
 * fields that are actually present in the config — never fabricated values. */
export function buildClinicJsonLd(clinic: ClinicConfig): Record<string, unknown> {
  const { business, contact, seo, social, rating } = clinic;

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType(clinic),
    name: business.name,
  };

  if (seo.siteUrl) node.url = seo.siteUrl;
  if (clinic.branding.logo) node.image = absoluteUrl(clinic, clinic.branding.logo);
  if (contact.phone) node.telephone = contact.phone;

  if (contact.address || contact.city) {
    const address: Record<string, unknown> = { "@type": "PostalAddress" };
    if (contact.address) address.streetAddress = contact.address;
    if (contact.city) address.addressLocality = contact.city;
    if (contact.region) address.addressRegion = contact.region;
    if (contact.postalCode) address.postalCode = contact.postalCode;
    if (contact.country) address.addressCountry = contact.country;
    node.address = address;
  }

  if (typeof contact.latitude === "number" && typeof contact.longitude === "number") {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: contact.latitude,
      longitude: contact.longitude,
    };
  }

  if (clinic.openingHours && clinic.openingHours.length > 0) {
    node.openingHours = clinic.openingHours.map((h) => `${h.days} ${h.hours}`);
  }

  const sameAs = social
    ? Object.values(social).filter((v): v is string => Boolean(v))
    : [];
  if (sameAs.length > 0) node.sameAs = sameAs;

  if (rating) {
    // `rating.score` is a display string (e.g. "4.9/5" or "10/10") — schema.org
    // wants just the numeric rating value, so split off the "out of X" part.
    const [ratingValue, bestRating] = rating.score.split("/").map((s) => s.trim());
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      ...(bestRating ? { bestRating } : {}),
      reviewCount: rating.basedOn,
    };
  }

  if (clinic.practitioners.length > 0) {
    node[clinic.practitioners.length === 1 ? "employee" : "employees"] =
      clinic.practitioners.length === 1
        ? practitionerNode(clinic, clinic.practitioners[0])
        : clinic.practitioners.map((p) => practitionerNode(clinic, p));
  }

  if (clinic.services.length > 0) {
    node.medicalSpecialty = clinic.services.map((s) => s.name);
  }

  return node;
}
