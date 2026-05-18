import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CareerJourney from "@/components/CareerJourney";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <CareerJourney />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
