import { Button } from "@/components/ui/button";
import { ArrowRight, User, Users, Home, Brain } from "lucide-react";
import individualImage from "@/assets/individual-therapy.jpg";
import groupImage from "@/assets/group-therapy.jpg";
import familyImage from "@/assets/family-therapy.jpg";

const Services = () => {
  const services = [
    {
      icon: User,
      title: "Individual Therapy",
      description: "Individual therapy provides a safe space to unpack your thoughts, explore your feelings, and work through challenges one-on-one with an experienced clinician.",
      image: individualImage,
      alt: "Professional mental health counselor having a one-on-one session with a client in a comfortable office setting"
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Group therapy provides a platform for children, teens, and adults to cultivate healthy relationships, navigate challenges, and hone new skills within a nurturing environment.",
      image: groupImage,
      alt: "Diverse group of people in a supportive group therapy session sitting in a circle"
    },
    {
      icon: Home,
      title: "Family Therapy",
      description: "Family therapy paves the way for peace at home by strengthening bonds, resolving conflicts, and establishing healthy boundaries.",
      image: familyImage,
      alt: "Happy diverse family with parents and children in a warm, supportive therapy environment"
    },
    {
      icon: Brain,
      title: "Psychological Testing",
      description: "Psycho-educational testing offers valuable insights into the roots of challenges, supplying essential data to guide therapeutic and educational interventions effectively.",
      image: individualImage, // Reusing for now
      alt: "Professional assessment and testing environment for psychological evaluation"
    }
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in offering a wide range of individual and group treatments, 
            taking special care to match individuals with the appropriate support chronologically, 
            developmentally, and emotionally.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
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
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Button className="btn-hero group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-elevated p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Ready to Take the First Step?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our experienced team is here to support you on your mental health journey. 
              Contact us today to learn more about our services and how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                Schedule a Consultation
              </Button>
              <Button className="btn-secondary">
                Call 703-876-8480
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;