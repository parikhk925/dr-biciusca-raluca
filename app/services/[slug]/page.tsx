import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/PageBanner";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/config/clinic";
import { buildPageMetadata } from "@/lib/seo";
import { phoneHref } from "@/lib/helpers";

export function generateStaticParams() {
  return clinic.services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = clinic.services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return buildPageMetadata(clinic, {
    title: service.name,
    description: service.shortDescription ?? service.description ?? service.name,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = clinic.services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const otherServices = clinic.services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const tel = phoneHref(clinic.contact.phone);

  return (
    <main className="bg-white">
      <PageBanner eyebrow="Services" title={service.name} subtitle={service.shortDescription} />

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_0.6fr] lg:px-10">
          <Reveal>
            <div>
              {service.description && (
                <p className="text-balance text-base leading-relaxed text-inkSoft">
                  {service.description}
                </p>
              )}

              {service.confirmed === false && (
                <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs leading-relaxed text-blue-800">
                  The exact availability of this treatment at {clinic.business.name} is confirmed
                  directly with the practice, at booking.
                </p>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact#appointment"
                  className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Book Appointment
                </Link>
                {tel && (
                  <a
                    href={tel}
                    className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-blue-50"
                  >
                    Call Now · {clinic.contact.phone}
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {otherServices.length > 0 && (
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-ink/10 bg-cream p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                  Other Services
                </p>
                <ul className="mt-4 space-y-3">
                  {otherServices.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-ink shadow-card transition-transform hover:-translate-y-0.5"
                      >
                        {s.name}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
