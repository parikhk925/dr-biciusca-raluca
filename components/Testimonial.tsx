import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Testimonial() {
  return (
    <section id="recenzii" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <div className="rounded-[2.25rem] bg-teal-900 p-10 text-center text-white sm:p-16">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-teal-200">
              Testimoniale
            </span>

            <p className="mx-auto mt-8 max-w-2xl text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
              „Pacienții menționează în mod repetat calmul, răbdarea și un tratament realizat
              fără durere.”
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="font-display text-4xl font-bold text-teal-300">
                {SITE.rating.score}
              </span>
              <span className="max-w-[10rem] text-left text-xs leading-tight text-white/60">
                evaluare medie din {SITE.rating.basedOn} recomandări publice ale pacienților
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
