"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "#top", label: "Acasă" },
  { href: "#servicii", label: "Servicii" },
  { href: "#despre", label: "Despre" },
  { href: "#recenzii", label: "Testimoniale" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-base">
            🦷
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {SITE.doctorName}
          </span>
        </a>

        <nav className="hidden items-center gap-1.5 rounded-full bg-white/10 p-1.5 backdrop-blur-md lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === item.href
                  ? "bg-white text-ink"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#programare"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5 lg:inline-flex"
        >
          Sună acum
        </a>

        <button
          aria-label="Deschide meniul"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
        >
          <svg width="20" height="14" viewBox="0 0 22 16" fill="none">
            <path d="M0 1H22" stroke="currentColor" strokeWidth="1.6" />
            <path d="M0 8H22" stroke="currentColor" strokeWidth="1.6" />
            <path d="M0 15H22" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-6 rounded-3xl bg-ink/95 px-6 py-6 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#programare"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-ink"
            >
              Sună acum
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
