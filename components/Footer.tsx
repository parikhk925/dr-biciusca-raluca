import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 pb-16 sm:grid-cols-4 lg:px-10">
        <div className="col-span-2 sm:col-span-1">
          <a href="#top" className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-base">
              🦷
            </span>
            <span className="font-display text-lg font-bold">{SITE.doctorName}</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            {SITE.practiceName}
            <br />
            {SITE.city}, {SITE.county}
          </p>
        </div>

        <FooterCol
          title="Meniu"
          items={[
            { label: "Acasă", href: "#top" },
            { label: "Servicii", href: "#servicii" },
            { label: "Despre", href: "#despre" },
            { label: "Contact", href: "#contact" },
          ]}
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
            Program
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-white/80">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
            Contact
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a href={`tel:${SITE.phoneE164}`} className="block text-white/80 hover:text-white">
              {SITE.phoneDisplay}
            </a>
            <p className="leading-relaxed text-white/60">{SITE.address}</p>
          </div>
        </div>
      </div>

      <div className="relative select-none overflow-hidden">
        <p className="translate-y-[0.22em] whitespace-nowrap text-center font-display text-[16vw] font-extrabold leading-none text-white/[0.04] sm:text-[13vw]">
          {SITE.practiceShort}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-6 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>© {new Date().getFullYear()} {SITE.practiceName}. Toate drepturile rezervate.</span>
        <div className="flex gap-6">
          <span className="cursor-default">Confidențialitate</span>
          <span className="cursor-default">Termeni și condiții</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-white/60">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="hover:text-white">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
