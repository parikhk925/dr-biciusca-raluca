import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/config/clinic";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(clinic, {
  title: "Services",
  description: `Services offered at ${clinic.business.name}${
    clinic.contact.city ? `, in ${clinic.contact.city}` : ""
  }.`,
});

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="Our Services"
        title="Complete care, clearly explained."
        subtitle="From routine check-ups to more complex treatments, every step is communicated in plain language, without rushing."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {clinic.services.length > 0 ? (
            <div className="grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-2 sm:divide-y-0 sm:border-y-0 sm:gap-px sm:bg-ink/10 lg:grid-cols-3">
              {clinic.services.map((service, i) => (
                <Reveal key={service.id} delay={i * 0.05} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col justify-between bg-white px-1 py-8 transition-colors hover:bg-cream sm:px-7"
                  >
                    <div>
                      <span className="font-display text-4xl font-bold text-ink/10 transition-colors group-hover:text-blue-500/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                        {service.name}
                      </h3>
                      {service.shortDescription && (
                        <p className="mt-3 text-sm leading-relaxed text-inkSoft">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Learn more
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1.5">
                        <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-inkSoft">
              Please contact us directly for a full list of available treatments.
            </p>
          )}

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-inkSoft/70">
              For the full, up-to-date list of available treatments, and any questions about a
              specific treatment, please contact us directly.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
