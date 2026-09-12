import Link from "next/link";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function ServicesPreview() {
  return (
    <section id="servicii" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                Serviciile noastre
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Îngrijire completă, explicată clar la fiecare pas.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              href="/servicii"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 underline decoration-blue-200 decoration-2 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-400"
            >
              Vezi toate serviciile
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-ink/10 border-t border-ink/10 sm:grid-cols-2 sm:divide-y-0 sm:border-t-0 sm:gap-px sm:bg-ink/10 lg:grid-cols-4">
          {SITE.services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05} className="h-full">
              <Link
                href={`/servicii/${service.slug}`}
                className="group flex h-full flex-col justify-between bg-cream px-1 py-7 transition-colors hover:bg-white sm:px-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-4xl font-bold text-ink/10 transition-colors group-hover:text-blue-500/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-blue-600">
                      <ServiceIcon slug={service.slug} />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-inkSoft">
                    {service.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Detalii
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1.5">
                    <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-xs leading-relaxed text-inkSoft/70">
            Pentru lista completă și actualizată a tratamentelor disponibile, te rugăm să ne
            contactezi direct.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceIcon({ slug }: { slug: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" as const };
  switch (slug) {
    case "stomatologie-generala":
      return (
        <svg {...common}>
          <path d="M12 3c-2.2 0-3.5 1.3-4.8 1.3S4.9 3.2 3.6 4c-1.6 1-1.9 3.9-1.2 6.8.8 3.4 2.6 8.7 4.3 8.7 1.4 0 1.6-2.6 3-2.6s1.7 2.6 3 2.6c1.8 0 3.6-5.5 4.3-8.7.7-2.9.4-5.8-1.2-6.8C14.3 3.2 13.2 4.3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "ortodontie":
      return (
        <svg {...common}>
          <path d="M4 9c0-2.8 3.6-5 8-5s8 2.2 8 5-3.6 5-8 5-8-2.2-8-5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 11.5 7 17c.2 1.5 1.6 2.5 3 2.2M17.5 11.5 17 17c-.2 1.5-1.6 2.5-3 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "endodontie":
      return (
        <svg {...common}>
          <path d="M9 3h6l1 6-3 3v9h-2v-9L8 9l1-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "radiologie-dentara":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 9c1.5 2 2.5-2 4 0s2.5-2 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "igienizare-profesionala":
      return (
        <svg {...common}>
          <path d="M5 4h9l5 5v11H5V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "albire-dentara":
      return (
        <svg {...common}>
          <path d="M12 3v3M5 6l2 2M19 6l-2 2M4 13h3M17 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 21c0-4.4 1.8-8 4-8s4 3.6 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "chirurgie-orala":
      return (
        <svg {...common}>
          <path d="M6 4c2 0 3 1.5 3 3.5S8 12 6 12s-3-2-3-4.5S4 4 6 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 8l10 10-2 2L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 20V10a6 6 0 1 1 12 0v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}
