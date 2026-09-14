# Clinic Website Template

A premium, reusable website template for doctors, dentists and clinics, built with Next.js 14,
TypeScript, Tailwind CSS and Framer Motion.

The entire site — copy, images, services, team, SEO, structured data — renders from **one
configuration file**: [`config/clinic.ts`](config/clinic.ts). To launch a new business, you edit
that file (and drop in its images); you should not need to touch any component code.

## Launching a new business

1. Open [`config/clinic.ts`](config/clinic.ts) and replace every field with the new business's
   real information (see [Configuration reference](#configuration-reference) below for what each
   field does and which are optional).
2. Add the new business's photos to `public/business/` and point the relevant `image`/`logo`
   fields in `clinic.ts` at them.
3. Run the site locally and check every page:

   ```bash
   npm install
   npm run dev
   ```

4. Verify `/`, `/about`, `/services`, `/reviews` and `/contact` — check the header/footer nav,
   phone and WhatsApp links, the appointment form, and that no section shows placeholder or
   "undefined" content.
5. `npm run build` to confirm there are no type or build errors, then deploy (e.g. to Vercel).

## How the template adapts to different businesses

### Solo practice vs. multi-practitioner clinic vs. unnamed staff

`clinic.practitioners` is an array. The homepage and `/about` page read its length and switch
layout automatically — no code changes required:

- **1 practitioner** → a doctor-focused "About Dr. X" layout (photo, bio, qualifications).
- **2+ practitioners** → a "Meet the Team" grid, with a business-type-aware default heading
  ("Meet Our Team of Dentists", "Meet Our Doctors", "Meet Our Medical Team", …), overridable via
  `teamSection`.
- **0 practitioners** → a clinic-level about section using `business.name` — never an empty team
  block.

### Missing data degrades gracefully

Every optional field is genuinely optional. Components hide the related UI when data is missing,
rather than rendering broken links, empty sections, or "N/A" placeholders — no Instagram icon
without `social.instagram`, no map without an address, no WhatsApp button without
`contact.whatsapp`, no fabricated reviews when `reviews` is empty.

## Configuration reference

All types live in [`config/types.ts`](config/types.ts) with inline comments; the summary below
covers the shape and which fields are required.

| Section | Required | Notes |
| --- | --- | --- |
| `business.name`, `business.type` | Yes | `type` is `"doctor" \| "dentist" \| "clinic" \| "medical"` — drives default copy and JSON-LD schema type. |
| `practitioners` | Yes (may be `[]`) | Array of `{ id, name, title?, specialty?, qualifications?, experienceYears?, languages?, shortBio?, bio?, image?, featured? }`. |
| `hero.headline`, `hero.description` | Yes | Rest of `hero` (image, tags, CTAs) optional. |
| `contact` | No (but needed for phone/address/map/WhatsApp UI to show) | `phone`, `whatsapp`, `email`, `address`, `city`, `region`, `postalCode`, `country`, `googleMapsUrl` or `latitude`/`longitude`. |
| `services` | Yes (may be `[]`) | Array of `{ id, slug, name, shortDescription?, description?, icon?, featured?, practitionerIds?, confirmed? }`. Powers `/services`, `/services/[slug]`, and the appointment form's reason list. `icon` keys are defined in `components/icons/ServiceIcon.tsx` — unknown/missing keys fall back to a generic icon. |
| `reviews` | No | `{ name, rating?, text, source?, practitionerId? }[]`. Leave unset/empty rather than inventing testimonials. |
| `stats`, `gallery`, `process`, `benefits`, `faq`, `insights` | No | Each section hides itself when its array is empty. |
| `openingHours` | No | `{ days, hours }[]`. |
| `social` | No | Only the platforms you set are shown. |
| `seo` | Yes (`title`, `description`) | `siteUrl` enables absolute OG/JSON-LD URLs. |
| `appointment` | No | `enabled`, plus `allowPractitionerSelection` (only meaningful with 2+ practitioners) and an optional `reasons` override (defaults to `services` names). |

## Architecture

```
app/
  page.tsx            homepage — Hero, About (adaptive), Stats, ServicesPreview, ...
  about/, services/, reviews/, contact/
  api/appointment/    appointment form submission handler

components/           shared, business-agnostic UI — no hardcoded business copy
  icons/ServiceIcon.tsx

config/
  types.ts            ClinicConfig type definitions
  clinic.ts            <-- the one file you edit per business

lib/
  helpers.ts           practitioner/contact/WhatsApp helpers
  seo.ts                Next.js Metadata builder
  schema.ts             JSON-LD structured data builder

public/
  business/            per-business images (demo: "Carter Dental Clinic")
```

## Structured data

`lib/schema.ts` builds JSON-LD from `business.type` (`Dentist`, `Physician`, or
`MedicalClinic`/`MedicalBusiness`), populated only with fields that are actually set in
`clinic.ts` — name, address, phone, geo, opening hours, `sameAs` social links, and
practitioners/services when present. It never fabricates values.

## Demo content

The default `config/clinic.ts` describes a fictional business, **Carter Dental Clinic** (London),
with a fictional solo dentist, **Dr. Emily Carter** — no real person, phone number or address.
The interior/exterior photography in `public/business/` is the original commissioned photography
from this template's source site, reused here as generic demo imagery. `public/business/portrait.jpg`
is left unused in the demo config, since it depicts the original site's real practitioner — when
you configure a new practitioner, replace it with (or point `practitioners[].image` at) that
practitioner's own photo.
