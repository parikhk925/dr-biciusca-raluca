import Image from "next/image";
import { clinic } from "@/config/clinic";
import { defaultTeamTitle, hasMultiplePractitioners, primaryPractitioner } from "@/lib/helpers";
import { Reveal } from "./Reveal";

export function About() {
  if (hasMultiplePractitioners(clinic)) {
    return <TeamAbout />;
  }
  return <SoloAbout />;
}

function SoloAbout() {
  const practitioner = primaryPractitioner(clinic);
  const eyebrow =
    clinic.about?.eyebrow ??
    (practitioner ? `About ${practitioner.name}` : `About ${clinic.business.name}`);
  const heading = clinic.about?.heading;
  const supportingText = clinic.about?.supportingText ?? practitioner?.shortBio;

  return (
    <section id="about" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.55fr_1fr]">
          <Reveal>
            <div>
              <span className="inline-flex rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-inkSoft">
                {eyebrow}
              </span>
              {(practitioner?.image || clinic.business.name) && (
                <div className="mt-6 flex items-center gap-3">
                  {practitioner?.image && (
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                      <Image
                        src={practitioner.image}
                        alt={practitioner.name}
                        fill
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span className="text-xs leading-tight text-inkSoft">
                    {clinic.business.name}
                    {clinic.contact.city && (
                      <>
                        <br />
                        {[clinic.contact.city, clinic.contact.region].filter(Boolean).join(", ")}
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {(heading || supportingText) && (
            <Reveal delay={0.1}>
              <p className="text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl lg:text-[2.35rem]">
                {heading && <span className="text-ink">{heading}</span>}{" "}
                {supportingText && <span className="text-inkSoft">{supportingText}</span>}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function TeamAbout() {
  const eyebrow = clinic.teamSection?.eyebrow ?? "Our Team";
  const title = clinic.teamSection?.title ?? defaultTeamTitle(clinic);
  const description = clinic.teamSection?.description;

  return (
    <section id="about" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-inkSoft">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-inkSoft">{description}</p>
          </Reveal>
        )}

        <div className="mt-12">
          <TeamGrid />
        </div>
      </div>
    </section>
  );
}

/** Practitioner card grid, reused on the homepage team section and the
 * /about page. Renders nothing when there are no practitioners. */
export function TeamGrid() {
  if (clinic.practitioners.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {clinic.practitioners.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.08} className="h-full">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
            {p.image && (
              <div className="relative aspect-[4/3] w-full">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
              {(p.title || p.specialty) && (
                <p className="mt-1 text-sm font-medium text-blue-700">
                  {[p.title, p.specialty].filter(Boolean).join(" · ")}
                </p>
              )}
              {p.shortBio && (
                <p className="mt-3 text-sm leading-relaxed text-inkSoft">{p.shortBio}</p>
              )}
              {p.qualifications && p.qualifications.length > 0 && (
                <p className="mt-4 text-xs uppercase tracking-wide text-inkSoft/70">
                  {p.qualifications.join(" · ")}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
