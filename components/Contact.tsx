import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { AppointmentForm } from "./AppointmentForm";

export function Contact() {
  const mapQuery = encodeURIComponent(SITE.address);

  return (
    <section id="contact" className="relative bg-cream py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                Suntem aici pentru tine.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 space-y-6">
                <InfoRow label="Adresă">
                  {SITE.practiceName}
                  <br />
                  {SITE.address}
                </InfoRow>
                <InfoRow label="Telefon / WhatsApp">
                  <a href={`tel:${SITE.phoneE164}`} className="hover:text-teal-700">
                    {SITE.phoneDisplay}
                  </a>
                </InfoRow>
                <InfoRow label="Program">
                  <div className="space-y-1">
                    {SITE.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6 text-sm">
                        <span>{h.days}</span>
                        <span className="font-medium text-ink">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </InfoRow>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <iframe
                  title="Harta locației cabinetului"
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                  className="h-64 w-full grayscale-[15%]"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <AppointmentForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/10 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">{label}</p>
      <div className="mt-2 text-base leading-relaxed text-ink">{children}</div>
    </div>
  );
}
