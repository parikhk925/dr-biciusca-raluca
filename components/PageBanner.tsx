import { Header } from "./Header";

export function PageBanner({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white">
      <Header variant="solid" />
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-50/40 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-blue-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-inkSoft">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
