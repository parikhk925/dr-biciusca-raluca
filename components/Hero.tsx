"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/lib/site";
import { Header } from "./Header";

const TAGS = [
  { label: "Consultație", active: true },
  { label: "Igienizare" },
  { label: "Obturație" },
  { label: "Tratament canal" },
  { label: "Ortodonție" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-ink">
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[2rem] sm:mx-6 sm:mt-6 lg:mx-8 lg:mt-8">
        <div className="relative h-[92svh] min-h-[620px] w-full">
          <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] h-[118%] w-full">
            <Image
              src="/images/hero.jpg"
              alt="Pacientă zâmbind în timpul unui consult stomatologic calm"
              fill
              priority
              className="animate-kenburns object-cover object-[60%_35%]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

          <Header />

          {/* floating service tags */}
          <div className="absolute right-6 top-24 hidden max-w-[220px] flex-col items-end gap-2 sm:right-10 sm:top-28 md:flex">
            <div className="flex flex-wrap justify-end gap-2">
              {TAGS.slice(0, 2).map((t) => (
                <Tag key={t.label} {...t} />
              ))}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {TAGS.slice(2, 4).map((t) => (
                <Tag key={t.label} {...t} />
              ))}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {TAGS.slice(4).map((t) => (
                <Tag key={t.label} {...t} />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 sm:px-10 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Stomatologie cu blândețe, fără teamă.
              </h1>
              <p className="mt-5 max-w-lg text-balance text-base leading-relaxed text-white/80 sm:text-lg">
                Tratament dentar într-un mediu calm și prietenos, unde comunicarea deschisă
                și confortul pacientului vin întotdeauna primele.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#programare"
                  className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  Programează-te
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white transition-transform group-hover:translate-x-0.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Sună acum · {SITE.phoneDisplay}
                </a>
              </div>
            </motion.div>

            {/* floating card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex max-w-xs items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-md sm:max-w-sm"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-white/10">
                <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M1 0.5v9l8-4.5z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs leading-snug text-white/90">
                  Tratament calm, explicat pas cu pas.
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-white/70">
                  <span className="text-teal-300">★</span> {SITE.rating.score} · {SITE.rating.basedOn} recomandări
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* bottom info bar */}
      <div className="mx-4 flex flex-col items-center justify-between gap-3 border-t border-white/10 px-4 py-5 text-xs uppercase tracking-[0.15em] text-white/50 sm:mx-6 sm:flex-row sm:px-6 lg:mx-8 lg:px-8">
        <span>{SITE.practiceName}</span>
        <span className="hidden sm:inline">{SITE.city}, {SITE.county}</span>
        <span>Derulează pentru mai multe</span>
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
