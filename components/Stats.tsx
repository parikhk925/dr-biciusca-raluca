import Image from "next/image";
import { clinic } from "@/config/clinic";
import { hasSinglePractitioner, phoneHref, primaryPractitioner } from "@/lib/helpers";
import { Reveal } from "./Reveal";

export function Stats() {
  const practitioner = hasSinglePractitioner(clinic) ? primaryPractitioner(clinic) : undefined;
  const tel = phoneHref(clinic.contact.phone);
  const galleryImage = clinic.gallery?.[0]?.src ?? clinic.hero.image;

  return (
    <section className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          {galleryImage && (
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-soft">
                <Image src={galleryImage} alt={clinic.business.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />

                {clinic.openingHours && clinic.openingHours.length > 0 && (
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-5 shadow-card backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
                      Opening Hours
                    </p>
                    <div className="mt-3 space-y-1.5">
                      {clinic.openingHours.map((h) => (
                        <div key={h.days} className="flex items-center justify-between text-sm">
                          <span className="text-inkSoft">{h.days}</span>
                          <span className="font-semibold text-ink">{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          )}

          <div>
            {clinic.stats && clinic.stats.length > 0 && (
              <Reveal>
                <div className="grid grid-cols-3 gap-4 border-b border-ink/10 pb-8">
                  {clinic.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-3xl font-bold text-ink sm:text-4xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-inkSoft">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {clinic.careSection && (
              <Reveal delay={0.1}>
                {clinic.careSection.eyebrow && (
                  <span className="mt-8 inline-flex rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-inkSoft">
                    {clinic.careSection.eyebrow}
                  </span>
                )}
                <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  {clinic.careSection.heading}
                </h2>
              </Reveal>
            )}
            {(practitioner?.bio || practitioner?.shortBio) && (
              <Reveal delay={0.14}>
                <p className="mt-4 max-w-md text-base leading-relaxed text-inkSoft">
                  {practitioner.shortBio ?? practitioner.bio}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="mt-7 flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-4">
                <div className="flex items-center gap-3">
                  {practitioner?.image && (
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Image src={practitioner.image} alt={practitioner.name} fill className="object-cover" />
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {practitioner?.name ?? clinic.business.name}
                    </p>
                    {practitioner?.title && (
                      <p className="text-xs text-inkSoft">{practitioner.title}</p>
                    )}
                  </div>
                </div>
                {tel && (
                  <a
                    href={tel}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white transition-transform hover:-translate-y-0.5"
                    aria-label="Call now"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.6c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1.1l-2.2 2.1Z"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
