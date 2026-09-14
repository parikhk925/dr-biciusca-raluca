import type { Metadata } from "next";
import type { ClinicConfig } from "@/config/types";

/** Build the root Next.js Metadata object from clinic.seo/business/contact.
 * Page-level metadata should spread this and override `title`/`description`. */
export function buildMetadata(clinic: ClinicConfig): Metadata {
  const { seo, business } = clinic;
  const siteUrl = seo.siteUrl;

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
    title: {
      default: seo.title,
      template: `%s — ${business.shortName ?? business.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
    ...(clinic.branding.favicon ? { icons: { icon: clinic.branding.favicon } } : {}),
  };
}

/** Build page-specific metadata that inherits the site-wide description/OG
 * image but overrides title and description for that page. */
export function buildPageMetadata(
  clinic: ClinicConfig,
  page: { title: string; description: string }
): Metadata {
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      ...(clinic.seo.ogImage ? { images: [{ url: clinic.seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
