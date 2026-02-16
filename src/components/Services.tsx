import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { getIconByName } from "@/lib/icon-map";
import { SmartLink } from "@/components/SmartLink";
import individualImage from "@/assets/individual-therapy.jpg";
import groupImage from "@/assets/group-therapy.jpg";
import familyImage from "@/assets/family-therapy.jpg";
import psychologicalTestingImage from "@/assets/psych-test-extreme.png";

const Services = () => {
  const {
    content: { services },
  } = useContent();

  const getServiceImage = (service: any, index: number) => {
    // DEBUG LOGGING
    if (service.title === "Psychological Testing") {
      console.log("DEBUG: Psychological Testing Service Object:", service);
      console.log("DEBUG: Index:", index);
    }

    // ABSOLUTE OVERRIDE - PRIORITY 1
    if (index === 3) return psychologicalTestingImage;
    if (service.title === "Psychological Testing") return psychologicalTestingImage;

    if (service.image) return service.image;
    if (index === 0) return individualImage;
    if (index === 1) return groupImage;
    if (index === 2) return familyImage;
    return psychologicalTestingImage;
  };

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">{services.heading}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.items.map((service, index) => {
            const Icon = getIconByName(service.icon);
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.title}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center card-elevated p-8`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      src={getServiceImage(service, index)}
                      alt={service.alt || service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    {Icon ? <Icon className="h-8 w-8 text-primary" /> : null}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground pb-1 leading-relaxed">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {service.cta ? (
                    <Button className="btn-hero group" asChild>
                      <SmartLink href={service.cta.url || "#"}>
                        {service.cta.label}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </SmartLink>
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-elevated p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{services.cta.heading}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {services.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero" asChild>
                <SmartLink href={services.cta.primaryCta.url || "#"}>{services.cta.primaryCta.label}</SmartLink>
              </Button>
              {services.cta.secondaryCta ? (
                <Button className="btn-secondary" asChild>
                  <SmartLink href={services.cta.secondaryCta.url || "#"}>{services.cta.secondaryCta.label}</SmartLink>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
