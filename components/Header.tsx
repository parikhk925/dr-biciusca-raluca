"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/config/clinic";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(variant === "solid");

  useEffect(() => {
    if (variant !== "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const solid = variant === "solid";
  const ctaLabel = clinic.hero.secondaryCTA ?? "Call Now";

  return (
    <header
      className={
        solid
          ? `sticky top-0 z-50 transition-shadow ${
              scrolled ? "bg-white/90 shadow-card backdrop-blur-md" : "bg-white"
            }`
          : "absolute inset-x-0 top-0 z-50"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className={`flex items-center gap-2 ${solid ? "text-blue-900" : "text-white"}`}
        >
          {clinic.branding.logo && (
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <Image src={clinic.branding.logo} alt="" fill className="object-cover" />
            </span>
          )}
          <span className="font-display text-lg font-bold tracking-tight">
            {clinic.business.shortName ?? clinic.business.name}
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-1.5 rounded-full p-1.5 backdrop-blur-md lg:flex ${
            solid ? "bg-blue-50" : "bg-white/10"
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                solid
                  ? "text-blue-900/80 hover:bg-white"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact#appointment"
          className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-card transition-transform hover:-translate-y-0.5 lg:inline-flex ${
            solid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-900"
          }`}
        >
          {ctaLabel}
        </Link>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            solid ? "bg-blue-50 text-blue-900" : "bg-white/10 text-white"
          }`}
        >
          <svg width="20" height="14" viewBox="0 0 22 16" fill="none">
            <path d="M0 1H22" stroke="currentColor" strokeWidth="1.6" />
            <path d="M0 8H22" stroke="currentColor" strokeWidth="1.6" />
            <path d="M0 15H22" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className={`mx-6 rounded-3xl px-6 py-6 backdrop-blur-md lg:hidden ${
            solid ? "bg-blue-900 shadow-soft" : "bg-blue-900/95"
          }`}
        >
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact#appointment"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-blue-900"
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
