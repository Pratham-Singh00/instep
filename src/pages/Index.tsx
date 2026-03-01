import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import CommunityPrograms from "@/components/CommunityPrograms";
import Testimonials from "@/components/Testimonials";
import GetInvolved from "@/components/GetInvolved";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

import { useContent } from "@/context/ContentContext";

const Index = () => {
  const {
    content: { hero },
  } = useContent();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="InStep PC | Mental Health & Therapy Services in Fairfax, VA"
        description="Premier mental health group practice in Fairfax, Northern Virginia. Offering individual therapy, group counseling, psychological testing, and community support programs for over 30 years."
      />
      <Header />
      <main>


        {/* Static Banner */}
        <div className="bg-accent/95 backdrop-blur-sm w-full relative z-20">
          <div className="container mx-auto px-4 py-3 text-center">
            <p className="text-accent-foreground font-semibold">{hero.bannerText}</p>
          </div>
        </div>

        <Hero />
        <About />
        <Services />
        <CommunityPrograms />
        <Testimonials />
        <GetInvolved />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
