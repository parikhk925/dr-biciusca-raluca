import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Stats } from "@/components/Stats";
import { WhyChoose } from "@/components/WhyChoose";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Despre Dr. Raluca — ${SITE.doctorName}`,
  description: `Despre ${SITE.doctorFullName}, medic stomatolog la ${SITE.practiceName}, în Roman, Neamț.`,
};

export default function DesprePage() {
  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="Despre Dr. Raluca"
        title="O abordare calmă, atentă și cu adevărat umană a stomatologiei."
        subtitle={`${SITE.doctorFullName} este medic stomatolog la ${SITE.practiceName}, în ${SITE.city}, ${SITE.county}.`}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-inkSoft">
              <p>
                Pune accent pe o comunicare deschisă și pe optimism, astfel încât fiecare
                pacient să înțeleagă exact ce urmează și să se simtă în largul lui în cabinet.
              </p>
              <p>
                Această abordare contează cel mai mult pentru pacienții care simt neliniște sau
                teamă la gândul unui tratament dentar — copii, adulți sau persoane care au avut
                experiențe neplăcute în trecut. Ritmul, explicațiile clare și răbdarea fac parte
                din fiecare vizită.
              </p>
              <p>
                Aria de activitate publică include stomatologie generală, ortodonție,
                endodonție și radiologie dentară.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />
      <WhyChoose />
      <CtaBanner />
      <Footer />
    </main>
  );
}
