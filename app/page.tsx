import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonial } from "@/components/Testimonial";
import { Insights } from "@/components/Insights";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <WhyChoose />
      <Testimonial />
      <Insights />
      <Contact />
      <Footer />
    </main>
  );
}
