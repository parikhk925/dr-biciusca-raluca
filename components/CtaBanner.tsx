import Link from "next/link";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaBanner() {
  return (
    <section className="relative bg-white px-6 pb-20 lg:px-10 lg:pb-28">
      <Reveal>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[2.25rem] bg-blue-600 px-8 py-16 text-center shadow-soft sm:px-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-900/30 blur-3xl" />

          <h2 className="relative text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Zâmbetul tău contează. Hai să vorbim.
          </h2>
          <p className="relative mt-4 max-w-md text-balance text-sm leading-relaxed text-white/80">
            Programează o consultație la {SITE.practiceName}, într-un mediu calm, gândit pentru
            confortul tău.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact#programare"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-card transition-transform hover:-translate-y-0.5"
            >
              Programează-te
            </Link>
            <a
              href={`tel:${SITE.phoneE164}`}
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Sună acum · {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
