import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-white pt-20 text-inkSoft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 pb-16 sm:grid-cols-4 lg:px-10">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-ink">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <Image src="/images/logo.jpg" alt="" fill className="object-cover" />
            </span>
            <span className="font-display text-lg font-bold">{SITE.doctorName}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-inkSoft">
            {SITE.practiceName}
            <br />
            {SITE.city}, {SITE.county}
          </p>
        </div>

        <FooterCol
          title="Meniu"
          items={[
            { label: "Acasă", href: "/" },
            { label: "Servicii", href: "/servicii" },
            { label: "Despre", href: "/despre" },
            { label: "Testimoniale", href: "/recenzii" },
            { label: "Contact", href: "/contact" },
          ]}
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
            Program
          </p>
          <ul className="mt-4 space-y-2 text-sm text-inkSoft">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="font-medium text-ink">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">
            Contact
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <a href={`tel:${SITE.phoneE164}`} className="block font-medium text-ink hover:text-blue-600">
              {SITE.phoneDisplay}
            </a>
            <p className="leading-relaxed text-inkSoft">{SITE.address}</p>
          </div>
        </div>
      </div>

      <div className="relative select-none overflow-hidden">
        <p className="translate-y-[0.22em] whitespace-nowrap text-center font-display text-[16vw] font-extrabold leading-none text-ink/[0.04] sm:text-[13vw]">
          {SITE.practiceShort}
        </p>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-ink/10 px-6 py-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between lg:px-10">
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
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/40">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-inkSoft">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-blue-600">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
