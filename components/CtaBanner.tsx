import Link from "next/link";
import { clinic } from "@/config/clinic";
import { phoneHref } from "@/lib/helpers";
import { Reveal } from "./Reveal";

export function CtaBanner() {
  const tel = phoneHref(clinic.contact.phone);

  return (
    <section className="relative bg-white px-6 pb-20 lg:px-10 lg:pb-28">
      <Reveal>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[2.25rem] bg-blue-600 px-8 py-16 text-center shadow-soft sm:px-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-900/30 blur-3xl" />

          <h2 className="relative text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Your smile matters. Let&rsquo;s talk.
          </h2>
          <p className="relative mt-4 max-w-md text-balance text-sm leading-relaxed text-white/80">
            Book a consultation at {clinic.business.name}, in a calm environment designed for
            your comfort.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact#appointment"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 shadow-card transition-transform hover:-translate-y-0.5"
            >
              {clinic.hero.primaryCTA ?? "Book Appointment"}
            </Link>
            {tel && (
              <a
                href={tel}
                className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {clinic.hero.secondaryCTA ?? "Call Now"} · {clinic.contact.phone}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
