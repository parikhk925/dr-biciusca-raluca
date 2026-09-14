// Central type definitions for the clinic/doctor website template.
//
// The whole site renders from ONE ClinicConfig object (see config/clinic.ts).
// To launch a new business, you normally only need to edit that one file —
// no component code should need to change.
//
// Every optional field is genuinely optional: components must hide the
// related UI gracefully when a field is missing rather than rendering
// "undefined", empty sections, or placeholder text.

export type BusinessType = "doctor" | "dentist" | "clinic" | "medical";

/** A single practitioner (doctor/dentist). Use an array of one for a solo
 * practice, several for a multi-practitioner clinic, or an empty array for
 * a clinic that doesn't want to name individual staff on the site. */
export interface Practitioner {
  /** Stable slug-like id, referenced by services/reviews, e.g. "dr-emily-carter" */
  id: string;
  name: string;
  title?: string;
  specialty?: string;
  qualifications?: string[];
  experienceYears?: number;
  languages?: string[];
  shortBio?: string;
  bio?: string;
  image?: string;
  /** Highlight this practitioner first in team listings */
  featured?: boolean;
}

export interface Service {
  /** Stable id, used for appointment-form selection and service–practitioner links */
  id: string;
  /** URL slug for /services/[slug] */
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  /** Icon key rendered by components/icons/ServiceIcon.tsx — unknown/missing keys fall back to a generic icon */
  icon?: string;
  featured?: boolean;
  /** Optional: which practitioners perform this service (by Practitioner.id) */
  practitionerIds?: string[];
  /** Set false when a treatment is offered but availability should be confirmed directly with the practice */
  confirmed?: boolean;
}

export interface Review {
  name: string;
  rating?: number;
  text: string;
  source?: string;
  /** Optional: attribute the review to a specific practitioner (by Practitioner.id) */
  practitionerId?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface ProcessStep {
  title: string;
  text: string;
  image?: string;
}

export interface Benefit {
  title: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InsightPost {
  tag: string;
  title: string;
  readTime?: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

/** Homepage/about heading shown when introducing the practice or a solo
 * practitioner. For multi-practitioner clinics, see `teamSection` instead. */
export interface AboutContent {
  eyebrow?: string;
  heading: string;
  /** Optional second sentence rendered in a softer tone under/after `heading` */
  supportingText?: string;
}

/** Copy for the "meet the team" section shown when there is more than one
 * practitioner. Falls back to a sensible default based on business.type. */
export interface TeamSection {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  googleMapsUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface AppointmentConfig {
  enabled: boolean;
  heading?: string;
  description?: string;
  recipientEmail?: string;
  bookingUrl?: string;
  /** Show a "Preferred practitioner" field when there is more than one practitioner */
  allowPractitionerSelection?: boolean;
  /** Reasons/treatments offered in the appointment form. Defaults to `services` when omitted. */
  reasons?: string[];
}

export interface HeroContent {
  eyebrow?: string;
  headline: string;
  highlightedText?: string;
  description: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  image?: string;
  imageAlt?: string;
  /** Small floating pill tags shown over the hero image */
  tags?: string[];
}

export interface SeoConfig {
  siteUrl?: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ClinicConfig {
  business: {
    name: string;
    shortName?: string;
    legalName?: string;
    type: BusinessType;
  };

  /** Zero, one, or many practitioners. The homepage and /about page adapt
   * their layout automatically based on this array's length. */
  practitioners: Practitioner[];

  branding: {
    logo?: string;
    favicon?: string;
  };

  hero: HeroContent;

  about?: AboutContent;
  /** Secondary homepage heading, shown next to the stats/hours panel */
  careSection?: {
    eyebrow?: string;
    heading: string;
  };
  teamSection?: TeamSection;

  contact: ContactInfo;
  openingHours?: OpeningHours[];

  services: Service[];
  reviews?: Review[];
  rating?: { score: string; basedOn: number };
  stats?: Stat[];
  gallery?: GalleryImage[];
  /** Short marquee/ticker words summarising the patient journey, e.g. ["Assessment", "Treatment Plan", "Procedure", "Aftercare"] */
  processTags?: string[];
  process?: ProcessStep[];
  benefits?: Benefit[];
  faq?: FaqItem[];
  insights?: InsightPost[];

  social?: SocialLinks;
  seo: SeoConfig;
  appointment?: AppointmentConfig;
}
