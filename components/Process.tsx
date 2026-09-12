import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            Cum decurge o vizită
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Fără surprize, fără grabă — doar pași clari.
          </h2>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent md:block" />
          {SITE.processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-display text-base font-bold text-white shadow-card">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inkSoft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
