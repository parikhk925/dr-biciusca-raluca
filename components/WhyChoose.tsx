import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function WhyChoose() {
  const [p1, p2, p3, p4] = SITE.philosophy;

  return (
    <section id="filozofie" className="relative bg-blue-900 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
            De ce {SITE.practiceName}?
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
            Pentru cei cărora le este teamă de stomatolog — mai ales pentru ei.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-2">
          <Reveal delay={0.05} className="md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                  01
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{p1.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{p1.text}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <div className="h-full rounded-3xl bg-blue-500 p-7 text-white">
              <span className="text-3xl font-bold">{SITE.rating.score}</span>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {p3.title} — {p3.text}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold">{p2.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p2.text}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold">{p4.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p4.text}</p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
