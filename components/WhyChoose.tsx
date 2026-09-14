import { clinic } from "@/config/clinic";
import { Reveal } from "./Reveal";

export function WhyChoose() {
  const benefits = clinic.benefits ?? [];
  if (benefits.length === 0) return null;

  const [b1, b2, b3, b4] = benefits;
  // The signature asymmetric layout (large feature + rating callout + two
  // small cards) needs exactly 4 benefits and a rating to look intentional.
  // With anything else, fall back to a simpler even grid.
  const useFeaturedLayout = benefits.length >= 4 && Boolean(clinic.rating);

  return (
    <section id="why-choose-us" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            Why {clinic.business.shortName ?? clinic.business.name}?
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Care built around your comfort, not just your treatment.
          </h2>
        </Reveal>

        {useFeaturedLayout ? (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-2">
            <Reveal delay={0.05} className="md:col-span-2 md:row-span-2" y={44}>
              <BenefitCard index={1} title={b1.title} text={b1.text} large />
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-2" y={44}>
              <div className="h-full rounded-3xl bg-blue-500 p-7 text-white shadow-card">
                <span className="text-3xl font-bold">{clinic.rating!.score}</span>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  {b3.title} — {b3.text}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15} y={44}>
              <BenefitCard title={b2.title} text={b2.text} />
            </Reveal>

            <Reveal delay={0.2} y={44}>
              <BenefitCard title={b4.title} text={b4.text} />
            </Reveal>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} y={44}>
                <BenefitCard title={b.title} text={b.text} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BenefitCard({
  index,
  title,
  text,
  large,
}: {
  index?: number;
  title: string;
  text: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-cream shadow-card transition-shadow hover:shadow-soft ${
        large ? "p-8" : "p-6"
      }`}
    >
      <div>
        {index && <span className="font-display text-4xl font-bold text-blue-500/25">0{index}</span>}
        <h3 className={large ? "mt-6 text-2xl font-semibold text-ink" : "text-lg font-semibold text-ink"}>
          {title}
        </h3>
        <p
          className={
            large
              ? "mt-3 max-w-sm text-sm leading-relaxed text-inkSoft"
              : "mt-2 text-sm leading-relaxed text-inkSoft"
          }
        >
          {text}
        </p>
      </div>
    </div>
  );
}
