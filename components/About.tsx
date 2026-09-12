import Image from "next/image";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="despre" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.55fr_1fr]">
          <Reveal>
            <div>
              <span className="inline-flex rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-inkSoft">
                Despre Dr. Raluca
              </span>
              <div className="mt-6 flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
                  <Image
                    src="/images/portrait.jpg"
                    alt={SITE.doctorName}
                    fill
                    className="object-cover"
                  />
                </span>
                <span className="text-xs leading-tight text-inkSoft">
                  {SITE.practiceName}
                  <br />
                  {SITE.city}, {SITE.county}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl lg:text-[2.35rem]">
              <span className="text-ink">
                Oferim tratamente stomatologice personalizate, într-un mediu calm,
              </span>{" "}
              <span className="text-inkSoft">
                cu comunicare deschisă și grijă reală pentru confortul fiecărui pacient — mai
                ales al celor cărora le este teamă de stomatolog.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
