import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { getIconByName } from "@/lib/icon-map";
import { getAssetUrl } from "@/lib/utils";
import { SmartLink } from "@/components/SmartLink";

const Hero = () => {
  const {
    content: { hero },
  } = useContent();

  const backgroundImage = hero.backgroundImage || getAssetUrl("hero-image.jpg");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Diverse group of people walking together on a wooden bridge through nature, symbolizing community support and healing journey"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>



      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-xl md:text-2xl font-light mb-4 text-primary-soft">{hero.tagline}</p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            {hero.titleBefore}{" "}
            <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>{" "}
            {hero.titleAfter}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-100 leading-relaxed">
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="btn-hero group" asChild>
              <SmartLink href={hero.primaryCta.url || "#"}>
                {hero.primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </SmartLink>
            </Button>
            <Button className="btn-secondary" asChild>
              <SmartLink href={hero.secondaryCta.url || "#"}>{hero.secondaryCta.label}</SmartLink>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {hero.stats.map((stat) => {
              const Icon = getIconByName(stat.icon);
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                    {Icon ? <Icon className="h-8 w-8 text-primary" /> : null}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-200">{stat.label}</div>
                </div>
              );
            })}
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
