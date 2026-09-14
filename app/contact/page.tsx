import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { clinic } from "@/config/clinic";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(clinic, {
  title: "Contact",
  description: `Contact ${clinic.business.name}${
    clinic.contact.city ? ` in ${clinic.contact.city}` : ""
  }${clinic.contact.phone ? `: ${clinic.contact.phone}` : ""}.`,
});

export default function ContactPage() {
  return (
    <main className="bg-white">
      <PageBanner
        eyebrow="Contact"
        title="We're here for you."
        subtitle="Fill in the form or call us directly to book a consultation."
      />
      <Contact />
      <Footer />
    </main>
  );
}
