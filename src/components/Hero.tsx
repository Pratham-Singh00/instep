import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Diverse group of people walking together on a wooden bridge through nature, symbolizing community support and healing journey"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      {/* Announcement Banner */}
      <div className="absolute top-20 left-0 right-0 z-20 bg-accent/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-accent-foreground font-semibold">
            🌟 Groups are NOW FORMING! Contact Us for More Information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-xl md:text-2xl font-light mb-4 text-primary-soft">
            WELCOME TO IN STEP
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Walking{" "}
            <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              in step
            </span>{" "}
            with you on your journey.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-100 leading-relaxed">
            For nearly 30 years, In Step has been providing comprehensive mental health services, 
            community programs, and specialized support for reentry and domestic violence survivors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="btn-hero group">
              Learn More About Our Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="btn-secondary">
              Get Started Today
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">30+</div>
              <div className="text-gray-200">Years of Service</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-gray-200">Lives Impacted</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
                <Users className="h-8 w-8 text-success" />
              </div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-gray-200">Group Programs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;