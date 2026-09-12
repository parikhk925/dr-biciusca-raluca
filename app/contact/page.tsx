import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${SITE.doctorName}`,
  description: `Contactează ${SITE.practiceName} din ${SITE.city}, ${SITE.county}: ${SITE.phoneDisplay}.`,
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="Contact"
        title="Suntem aici pentru tine."
        subtitle="Completează formularul sau sună-ne direct pentru a programa o consultație."
      />
      <Contact />
      <Footer />
    </main>
  );
}
