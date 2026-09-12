import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Testimonial } from "@/components/Testimonial";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Ce spun pacienții — ${SITE.doctorName}`,
  description: `Evaluarea publică a pacienților pentru ${SITE.practiceName}: ${SITE.rating.score} din ${SITE.rating.basedOn} recomandări.`,
};

export default function RecenziiPage() {
  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="Ce spun pacienții"
        title={`${SITE.rating.score} — evaluare medie din ${SITE.rating.basedOn} recomandări publice.`}
        subtitle="Pacienții menționează în mod repetat calmul, răbdarea și un tratament realizat fără durere."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="text-sm leading-relaxed text-inkSoft">
              Recenzii scrise, integrale, pot fi adăugate aici de îndată ce sunt puse la
              dispoziție de cabinet. Rating-ul afișat reflectă evaluarea publică disponibilă la
              momentul publicării acestui site.
            </p>
          </Reveal>
        </div>
      </section>

      <Testimonial />
      <Faq />
      <CtaBanner />
      <Footer />
    </main>
  );
}
