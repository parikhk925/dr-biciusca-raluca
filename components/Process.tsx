import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
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

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-100 md:left-1/2 md:-translate-x-1/2" />

          {SITE.processSteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={step.title} delay={i * 0.06} className="relative">
                <div className="relative grid grid-cols-1 items-center gap-2 py-8 md:grid-cols-2 md:gap-12">
                  <span
                    className="absolute left-6 top-8 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 font-display text-sm font-bold text-white shadow-card md:left-1/2"
                  >
                    {i + 1}
                  </span>

                  <div
                    className={`pl-16 md:pl-0 ${
                      isLeft
                        ? "md:order-1 md:pr-14 md:text-right"
                        : "md:order-2 md:pl-14 md:col-start-2"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-inkSoft md:ml-auto">
                      {step.text}
                    </p>
                  </div>

                  {isLeft ? (
                    <div className="hidden md:order-2 md:block" />
                  ) : (
                    <div className="hidden md:order-1 md:block" />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
