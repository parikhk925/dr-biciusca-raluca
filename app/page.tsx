import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Process } from "@/components/Process";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonial } from "@/components/Testimonial";
import { Insights } from "@/components/Insights";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <ServicesPreview />
      <Process />
      <WhyChoose />
      <Testimonial />
      <Insights />
      <Faq />
      <CtaBanner />
      <Footer />
    </main>
  );
}
