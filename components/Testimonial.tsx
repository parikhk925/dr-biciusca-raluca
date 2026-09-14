import { clinic } from "@/config/clinic";
import { Reveal } from "./Reveal";

export function Testimonial() {
  const featured = clinic.reviews?.[0];
  if (!featured && !clinic.rating) return null;

  return (
    <section id="reviews" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal y={48}>
          <div className="rounded-[2.25rem] border border-ink/10 bg-white p-10 text-center shadow-soft sm:p-16">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
              Reviews
            </span>

            {featured && (
              <p className="mx-auto mt-8 max-w-2xl text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                &ldquo;{featured.text}&rdquo;
              </p>
            )}

            {clinic.rating && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="font-display text-4xl font-bold text-blue-600">
                  {clinic.rating.score}
                </span>
                <span className="max-w-[10rem] text-left text-xs leading-tight text-inkSoft">
                  average rating from {clinic.rating.basedOn} public patient reviews
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
