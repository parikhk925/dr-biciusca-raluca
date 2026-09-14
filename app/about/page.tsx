import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/PageBanner";
import { Stats } from "@/components/Stats";
import { WhyChoose } from "@/components/WhyChoose";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TeamGrid } from "@/components/About";
import { clinic } from "@/config/clinic";
import { buildPageMetadata } from "@/lib/seo";
import {
  defaultTeamTitle,
  hasMultiplePractitioners,
  hasSinglePractitioner,
  practitionerNoun,
  primaryPractitioner,
} from "@/lib/helpers";

export function generateMetadata(): Metadata {
  const practitioner = hasSinglePractitioner(clinic) ? primaryPractitioner(clinic) : undefined;
  const multi = hasMultiplePractitioners(clinic);

  const title = practitioner
    ? `About ${practitioner.name}`
    : multi
      ? clinic.teamSection?.title ?? defaultTeamTitle(clinic)
      : `About ${clinic.business.name}`;

  const description = practitioner
    ? `About ${practitioner.name}, ${practitioner.title ?? practitionerNoun(clinic)} at ${clinic.business.name}${
        clinic.contact.city ? `, in ${clinic.contact.city}` : ""
      }.`
    : multi
      ? clinic.teamSection?.description ?? `Meet the practitioners at ${clinic.business.name}.`
      : `About ${clinic.business.name}${clinic.contact.city ? `, in ${clinic.contact.city}` : ""}.`;

  return buildPageMetadata(clinic, { title, description });
}

export default function AboutPage() {
  const practitioner = hasSinglePractitioner(clinic) ? primaryPractitioner(clinic) : undefined;
  const multi = hasMultiplePractitioners(clinic);

  return (
    <main className="bg-white">
      {practitioner && (
        <PageBanner
          eyebrow={`About ${practitioner.name}`}
          title="A calm, attentive and genuinely human approach to care."
          subtitle={`${practitioner.name} is a ${practitioner.title ?? practitionerNoun(clinic)} at ${
            clinic.business.name
          }${clinic.contact.city ? `, in ${clinic.contact.city}` : ""}.`}
        />
      )}
      {multi && (
        <PageBanner
          eyebrow="About the Team"
          title={clinic.teamSection?.title ?? defaultTeamTitle(clinic)}
          subtitle={
            clinic.teamSection?.description ??
            `The practitioners behind ${clinic.business.name}, each bringing their own expertise to your care.`
          }
        />
      )}
      {!practitioner && !multi && (
        <PageBanner
          eyebrow={`About ${clinic.business.name}`}
          title={clinic.about?.heading ?? `Get to know ${clinic.business.name}.`}
          subtitle={clinic.about?.supportingText}
        />
      )}

      {practitioner && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.8fr_1fr] lg:gap-16 lg:px-10">
            {practitioner.image && (
              <Reveal>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-soft">
                  <Image
                    src={practitioner.image}
                    alt={practitioner.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-inkSoft">
                {(practitioner.bio ?? practitioner.shortBio) && (
                  <p>{practitioner.bio ?? practitioner.shortBio}</p>
                )}

                {(practitioner.qualifications?.length ||
                  practitioner.experienceYears ||
                  practitioner.languages?.length) && (
                  <dl className="grid grid-cols-1 gap-4 border-t border-ink/10 pt-5 sm:grid-cols-3">
                    {practitioner.qualifications && practitioner.qualifications.length > 0 && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                          Qualifications
                        </dt>
                        <dd className="mt-1 text-sm text-ink">
                          {practitioner.qualifications.join(", ")}
                        </dd>
                      </div>
                    )}
                    {practitioner.experienceYears && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                          Experience
                        </dt>
                        <dd className="mt-1 text-sm text-ink">
                          {practitioner.experienceYears}+ years
                        </dd>
                      </div>
                    )}
                    {practitioner.languages && practitioner.languages.length > 0 && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                          Languages
                        </dt>
                        <dd className="mt-1 text-sm text-ink">
                          {practitioner.languages.join(", ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                {clinic.services.length > 0 && (
                  <p>
                    Areas of practice include{" "}
                    {clinic.services.map((s) => s.name.toLowerCase()).join(", ")}.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {multi && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <TeamGrid />
          </div>
        </section>
      )}

      <Stats />
      <WhyChoose />
      <CtaBanner />
      <Footer />
    </main>
  );
}
