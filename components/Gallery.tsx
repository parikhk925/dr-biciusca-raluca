import Image from "next/image";
import { clinic } from "@/config/clinic";
import { Reveal } from "./Reveal";

export function Gallery() {
  const images = clinic.gallery ?? [];
  if (images.length === 0) return null;

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            Our Practice
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {clinic.business.name}
            {clinic.contact.city ? `, in ${clinic.contact.city}.` : "."}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          {images.slice(0, 2).map((img, i) => (
            <Reveal key={img.src} delay={0.05 + i * 0.07}>
              <div
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-soft ${
                  i === 1 ? "lg:aspect-auto lg:h-full" : ""
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
