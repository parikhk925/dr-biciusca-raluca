import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/config/clinic";
import { formatAddressLines, phoneHref } from "@/lib/helpers";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function Footer() {
  const addressLines = formatAddressLines(clinic);
  const tel = phoneHref(clinic.contact.phone);
  const socialEntries = Object.entries(clinic.social ?? {}).filter(([, url]) => Boolean(url));

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-white pt-20 text-inkSoft">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 sm:grid-cols-4 lg:px-10">
        <div className="sm:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-ink">
            {clinic.branding.logo && (
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <Image src={clinic.branding.logo} alt="" fill className="object-cover" />
              </span>
            )}
            <span className="font-display text-lg font-bold">
              {clinic.business.shortName ?? clinic.business.name}
            </span>
          </Link>
          {(clinic.business.name || clinic.contact.city) && (
            <p className="mt-4 text-sm leading-relaxed text-inkSoft">
              {clinic.business.name}
              {clinic.contact.city && (
                <>
                  <br />
                  {[clinic.contact.city, clinic.contact.region].filter(Boolean).join(", ")}
                </>
              )}
            </p>
          )}
        </div>

        <FooterCol title="Menu" items={NAV} />

        {clinic.openingHours && clinic.openingHours.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              Opening Hours
            </p>
            <ul className="mt-4 space-y-2 text-sm text-inkSoft">
              {clinic.openingHours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="font-medium text-ink">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(clinic.contact.phone || addressLines.length > 0 || socialEntries.length > 0) && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
              Contact
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {tel && (
                <a href={tel} className="block font-medium text-ink hover:text-blue-600">
                  {clinic.contact.phone}
                </a>
              )}
              {addressLines.length > 0 && (
                <p className="leading-relaxed text-inkSoft">{addressLines.join(", ")}</p>
              )}
              {socialEntries.length > 0 && (
                <div className="flex gap-3 pt-1">
                  {socialEntries.map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-inkSoft hover:text-blue-600"
                    >
                      {SOCIAL_LABELS[key] ?? key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative select-none overflow-hidden">
        <p className="translate-y-[0.22em] whitespace-nowrap text-center font-display text-[16vw] font-extrabold leading-none text-ink/[0.04] sm:text-[13vw]">
          {clinic.business.shortName ?? clinic.business.name}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-ink/10 px-6 py-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>
          © {new Date().getFullYear()} {clinic.business.name}. All rights reserved.
        </span>
        <div className="flex gap-6">
          <span className="cursor-default">Privacy Policy</span>
          <span className="cursor-default">Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-inkSoft">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-blue-600">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
