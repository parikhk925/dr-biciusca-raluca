import { clinic } from "@/config/clinic";

export function Marquee() {
  const tags = clinic.processTags ?? [];
  if (tags.length === 0) return null;

  return (
    <div className="border-b border-ink/10 bg-cream py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 text-xs font-medium uppercase tracking-[0.15em] text-inkSoft/70 sm:justify-between lg:px-10">
        {tags.map((step, i) => (
          <span key={step} className="flex items-center gap-3">
            {i !== 0 && <span className="h-px w-8 bg-ink/15" />}
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
