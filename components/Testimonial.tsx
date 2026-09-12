import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Testimonial() {
  return (
    <section id="recenzii" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal y={48}>
          <div className="rounded-[2.25rem] border border-ink/10 bg-white p-10 text-center shadow-soft sm:p-16">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
              Testimoniale
            </span>

            <p className="mx-auto mt-8 max-w-2xl text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              „Pacienții menționează în mod repetat calmul, răbdarea și un tratament realizat
              fără durere.”
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="font-display text-4xl font-bold text-blue-600">
                {SITE.rating.score}
              </span>
              <span className="max-w-[10rem] text-left text-xs leading-tight text-inkSoft">
                evaluare medie din {SITE.rating.basedOn} recomandări publice ale pacienților
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
