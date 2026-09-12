import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Servicii — ${SITE.doctorName}`,
  description: "Serviciile stomatologice oferite la " + SITE.practiceName + ", în Roman, Neamț.",
};

export default function ServiciiPage() {
  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="Serviciile noastre"
        title="Îngrijire dentară completă, explicată clar."
        subtitle="De la controale de rutină la tratamente mai complexe, fiecare etapă este comunicată pe înțelesul tău, fără grabă."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-2 sm:divide-y-0 sm:border-y-0 sm:gap-px sm:bg-ink/10 lg:grid-cols-3">
            {SITE.services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05} className="h-full">
                <Link
                  href={`/servicii/${service.slug}`}
                  className="group flex h-full flex-col justify-between bg-white px-1 py-8 transition-colors hover:bg-cream sm:px-7"
                >
                  <div>
                    <span className="font-display text-4xl font-bold text-ink/10 transition-colors group-hover:text-blue-500/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-inkSoft">
                      {service.description}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    Află mai multe
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1.5">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-inkSoft/70">
              Pentru lista completă și actualizată a tratamentelor disponibile, precum și pentru
              orice întrebare legată de un tratament anume, te rugăm să ne contactezi direct.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
