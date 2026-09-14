import Link from "next/link";
import { clinic } from "@/config/clinic";
import { ServiceIcon } from "./icons/ServiceIcon";
import { Reveal } from "./Reveal";

export function ServicesPreview() {
  if (clinic.services.length === 0) return null;
  const preview = clinic.services.slice(0, 4);

  return (
    <section id="services" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                Our Services
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Comprehensive care, clearly explained at every step.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 underline decoration-blue-200 decoration-2 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-400"
            >
              View all services
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-ink/10 border-t border-ink/10 sm:grid-cols-2 sm:divide-y-0 sm:border-t-0 sm:gap-px sm:bg-ink/10 lg:grid-cols-4">
          {preview.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between bg-cream px-1 py-7 transition-colors hover:bg-white sm:px-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-4xl font-bold text-ink/10 transition-colors group-hover:text-blue-500/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-blue-600">
                      <ServiceIcon icon={service.icon} />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {service.name}
                  </h3>
                  {service.shortDescription && (
                    <p className="mt-2 text-sm leading-relaxed text-inkSoft">
                      {service.shortDescription}
                    </p>
                  )}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Details
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
            For the full, up-to-date list of available treatments, please contact us directly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
