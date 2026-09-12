import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function WhyChoose() {
  const [p1, p2, p3, p4] = SITE.philosophy;

  return (
    <section id="filozofie" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            De ce {SITE.practiceName}?
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Pentru cei cărora le este teamă de stomatolog — mai ales pentru ei.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-2">
          <Reveal delay={0.05} className="md:col-span-2 md:row-span-2" y={44}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-cream p-8 shadow-card transition-shadow hover:shadow-soft">
              <div>
                <span className="font-display text-4xl font-bold text-blue-500/25">01</span>
                <h3 className="mt-6 text-2xl font-semibold text-ink">{p1.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-inkSoft">{p1.text}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2" y={44}>
            <div className="h-full rounded-3xl bg-blue-500 p-7 text-white shadow-card">
              <span className="text-3xl font-bold">{SITE.rating.score}</span>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {p3.title} — {p3.text}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} y={44}>
            <div className="h-full rounded-3xl border border-ink/10 bg-cream p-6 shadow-card transition-shadow hover:shadow-soft">
              <h3 className="text-lg font-semibold text-ink">{p2.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-inkSoft">{p2.text}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} y={44}>
            <div className="h-full rounded-3xl border border-ink/10 bg-cream p-6 shadow-card transition-shadow hover:shadow-soft">
              <h3 className="text-lg font-semibold text-ink">{p4.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-inkSoft">{p4.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
