"use client";

import { useState } from "react";
import { clinic } from "@/config/clinic";
import { Reveal } from "./Reveal";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = clinic.faq ?? [];
  if (items.length === 0) return null;

  return (
    <section className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            Frequently Asked Questions
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            You might already be wondering about this.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white shadow-card transition-colors ${
                    isOpen ? "border-blue-300" : "border-ink/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{item.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm leading-relaxed text-inkSoft">
                      {item.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
