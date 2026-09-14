import { clinic } from "@/config/clinic";
import { formatAddressLines, googleMapsEmbedUrl, phoneHref } from "@/lib/helpers";
import { Reveal } from "./Reveal";
import { AppointmentForm } from "./AppointmentForm";

export function Contact() {
  const addressLines = formatAddressLines(clinic);
  const tel = phoneHref(clinic.contact.phone);
  const mapUrl = googleMapsEmbedUrl(clinic);

  return (
    <section id="contact" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {(addressLines.length > 0 || tel || (clinic.openingHours?.length ?? 0) > 0) && (
              <Reveal delay={0.16}>
                <div className="mt-8 space-y-6">
                  {addressLines.length > 0 && (
                    <InfoRow label="Address">
                      {clinic.business.name}
                      <br />
                      {addressLines.join(", ")}
                    </InfoRow>
                  )}
                  {tel && (
                    <InfoRow label="Phone / WhatsApp">
                      <a href={tel} className="hover:text-blue-700">
                        {clinic.contact.phone}
                      </a>
                    </InfoRow>
                  )}
                  {clinic.openingHours && clinic.openingHours.length > 0 && (
                    <InfoRow label="Opening Hours">
                      <div className="space-y-1">
                        {clinic.openingHours.map((h) => (
                          <div key={h.days} className="flex justify-between gap-6 text-sm">
                            <span>{h.days}</span>
                            <span className="font-medium text-ink">{h.hours}</span>
                          </div>
                        ))}
                      </div>
                    </InfoRow>
                  )}
                </div>
              </Reveal>
            )}

            {mapUrl && (
              <Reveal delay={0.24}>
                <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                  <iframe
                    title="Practice location map"
                    src={mapUrl}
                    className="h-64 w-full grayscale-[15%]"
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                </div>
              </Reveal>
            )}
          </div>

          {clinic.appointment?.enabled !== false && (
            <Reveal delay={0.1}>
              <AppointmentForm />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/10 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{label}</p>
      <div className="mt-2 text-base leading-relaxed text-ink">{children}</div>
    </div>
  );
}
