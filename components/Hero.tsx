"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { clinic } from "@/config/clinic";
import { phoneHref } from "@/lib/helpers";
import { Header } from "./Header";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const tel = phoneHref(clinic.contact.phone);
  const tags = clinic.hero.tags ?? [];
  const heroImage = clinic.hero.image;

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-blue-950">
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-6 lg:mx-8 lg:mt-8">
        <div className="relative h-[100svh] min-h-[680px] w-full sm:h-[92svh] sm:min-h-[620px]">
          {heroImage && (
            <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] h-[118%] w-full">
              <Image
                src={heroImage}
                alt={clinic.hero.imageAlt ?? ""}
                fill
                priority
                className="animate-kenburns object-cover object-[60%_35%]"
              />
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-blue-900/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-950/10 to-transparent" />

          <Header />

          {tags.length > 0 && (
            <div className="absolute right-6 top-24 hidden max-w-[220px] flex-col items-end gap-2 sm:right-10 sm:top-28 md:flex">
              <div className="flex flex-wrap justify-end gap-2">
                {tags.slice(0, 2).map((t, i) => (
                  <Tag key={t} label={t} active={i === 0} />
                ))}
              </div>
              {tags.length > 2 && (
                <div className="flex flex-wrap justify-end gap-2">
                  {tags.slice(2, 4).map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              )}
              {tags.length > 4 && (
                <div className="flex flex-wrap justify-end gap-2">
                  {tags.slice(4).map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 sm:px-10 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                {clinic.hero.headline}
              </h1>
              <p className="mt-4 max-w-lg text-balance text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
                {clinic.hero.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
                <a
                  href="/contact#appointment"
                  className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  {clinic.hero.primaryCTA ?? "Book Appointment"}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white transition-transform group-hover:translate-x-0.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
                {tel && (
                  <a
                    href={tel}
                    className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {clinic.hero.secondaryCTA ?? "Call Now"} · {clinic.contact.phone}
                  </a>
                )}
              </div>
            </motion.div>

            {heroImage && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 hidden max-w-xs items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-md sm:mt-8 sm:flex sm:max-w-sm"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-white/10">
                  <Image src={heroImage} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-950/40">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M1 0.5v9l8-4.5z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs leading-snug text-white/90">
                    Calm treatment, explained step by step.
                  </p>
                  {clinic.rating && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-white/70">
                      <span className="text-blue-300">★</span> {clinic.rating.score} ·{" "}
                      {clinic.rating.basedOn} reviews
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-4 flex flex-col items-center justify-between gap-3 border-t border-white/10 px-4 py-5 text-xs uppercase tracking-[0.15em] text-white/50 sm:mx-6 sm:flex-row sm:px-6 lg:mx-8 lg:px-8">
        <span>{clinic.business.name}</span>
        {clinic.contact.city && (
          <span className="hidden sm:inline">
            {[clinic.contact.city, clinic.contact.region].filter(Boolean).join(", ")}
          </span>
        )}
        <span>Scroll for more</span>
      </div>
    </section>
  );
}

function Tag({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium backdrop-blur-md ${
        active ? "bg-white text-ink" : "bg-white/15 text-white/90"
      }`}
    >
      {label}
    </span>
  );
}
