import type { ClinicConfig, Practitioner } from "@/config/types";

// ---------------------------------------------------------------------------
// Practitioner helpers — the site must support a solo practice, a
// multi-practitioner clinic, and a clinic with no named staff, all from the
// same components. Use these instead of assuming `practitioners[0]` exists.
// ---------------------------------------------------------------------------

export function hasSinglePractitioner(clinic: ClinicConfig): boolean {
  return clinic.practitioners.length === 1;
}

export function hasMultiplePractitioners(clinic: ClinicConfig): boolean {
  return clinic.practitioners.length > 1;
}

export function hasNoPractitioners(clinic: ClinicConfig): boolean {
  return clinic.practitioners.length === 0;
}

export function primaryPractitioner(clinic: ClinicConfig): Practitioner | undefined {
  if (clinic.practitioners.length === 0) return undefined;
  return clinic.practitioners.find((p) => p.featured) ?? clinic.practitioners[0];
}

export function findPractitioner(
  clinic: ClinicConfig,
  id: string | undefined
): Practitioner | undefined {
  if (!id) return undefined;
  return clinic.practitioners.find((p) => p.id === id);
}

/** Default "meet the team" heading, used when `teamSection.title` isn't set. */
export function defaultTeamTitle(clinic: ClinicConfig): string {
  switch (clinic.business.type) {
    case "dentist":
      return "Meet Our Team of Dentists";
    case "doctor":
      return "Meet Our Doctors";
    case "medical":
      return "Meet Our Medical Team";
    case "clinic":
    default:
      return "Meet Our Specialists";
  }
}

/** Default practitioner-facing noun, e.g. "dentist" vs "doctor" — used in
 * small copy fragments where a single word reads more naturally than the
 * full team heading. */
export function practitionerNoun(clinic: ClinicConfig): string {
  switch (clinic.business.type) {
    case "dentist":
      return "dentist";
    case "doctor":
      return "doctor";
    default:
      return "practitioner";
  }
}

// ---------------------------------------------------------------------------
// Contact helpers
// ---------------------------------------------------------------------------

export function phoneHref(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function emailHref(email: string | undefined): string | undefined {
  if (!email) return undefined;
  return `mailto:${email}`;
}

export function formatAddressLines(clinic: ClinicConfig): string[] {
  const { address, city, region, postalCode, country } = clinic.contact;
  const lines: string[] = [];
  if (address) lines.push(address);
  const cityLine = [city, region, postalCode].filter(Boolean).join(", ");
  if (cityLine) lines.push(cityLine);
  if (country) lines.push(country);
  return lines;
}

export function googleMapsEmbedUrl(clinic: ClinicConfig): string | undefined {
  const { googleMapsUrl, address, latitude, longitude } = clinic.contact;
  if (googleMapsUrl) return googleMapsUrl;
  if (typeof latitude === "number" && typeof longitude === "number") {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  }
  if (address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// WhatsApp appointment handoff
// ---------------------------------------------------------------------------

export function buildWhatsappMessage(
  clinic: ClinicConfig,
  params: {
    name: string;
    phone: string;
    reason?: string;
    date?: string;
    details?: string;
  }
) {
  const lines = [
    `Hi, I'd like to book an appointment at ${clinic.business.name}.`,
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
  ];
  if (params.reason) lines.push(`Reason: ${params.reason}`);
  if (params.date) lines.push(`Preferred date/time: ${params.date}`);
  if (params.details) lines.push(`Details: ${params.details}`);
  return lines.join("\n");
}

export function buildWhatsappUrl(clinic: ClinicConfig, message: string): string | undefined {
  const number = clinic.contact.whatsapp;
  if (!number) return undefined;
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}
