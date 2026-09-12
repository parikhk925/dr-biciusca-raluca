import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Insights() {
  return (
    <section className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-inkSoft">
            Sfaturi utile
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Câteva repere pentru o sănătate dentară de durată.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {SITE.insights.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-teal-500/40">
                <span className="inline-flex rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                  {post.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">
                  {post.title}
                </h3>
                <div className="mt-6 flex items-center justify-between text-xs text-inkSoft">
                  <span>{SITE.practiceName}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
