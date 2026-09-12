import { SITE } from "@/lib/site";

export function Marquee() {
  return (
    <div className="border-b border-ink/10 bg-cream py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 text-xs font-medium uppercase tracking-[0.15em] text-inkSoft/70 sm:justify-between lg:px-10">
        {SITE.process.map((step, i) => (
          <span key={step} className="flex items-center gap-3">
            {i !== 0 && <span className="h-px w-8 bg-ink/15" />}
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
