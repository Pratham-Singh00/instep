import { SmartLink } from "@/components/SmartLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { getIconByName } from "@/lib/icon-map";

const About = () => {
  const {
    content: { about },
  } = useContent();

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">{about.heading}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Our Story */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{about.storyHeading}</h3>
            <div className="prose prose-lg max-w-none">
              {about.storyParagraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-foreground">{about.certificationsHeading}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {about.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{about.impactHeading}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {about.achievements.map((achievement) => {
                const Icon = getIconByName(achievement.icon);
                return (
                  <Card key={achievement.label} className="card-elevated text-center p-6">
                    <CardContent className="p-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                        {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {achievement.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Special Recognition */}
            <div className="card-elevated p-6 text-center">
              <Badge variant="outline" className="mb-4">
                Community Recognition
              </Badge>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Leading Mental Health Provider
              </h4>
              <p className="text-sm text-muted-foreground">
                Recognized for excellence in community mental health services, 
                trauma-informed care, and innovative group therapy programs.
              </p>
            </div>
          </div>
        </div>

          {/* Core Values */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              {about.valuesHeading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.values.map((value) => {
                const Icon = getIconByName(value.icon);
                return (
                  <Card key={value.title} className="card-elevated text-center p-6 group hover:scale-105 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                        {Icon ? <Icon className="h-8 w-8 text-primary" /> : null}
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card-elevated p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{about.cta.heading}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {about.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero group" asChild>
                <SmartLink href={about.cta.primaryCta.url || "#"}>
                  {about.cta.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </SmartLink>
              </Button>
              {about.cta.secondaryCta ? (
                <Button className="btn-secondary" asChild>
                  <SmartLink href={about.cta.secondaryCta.url || "#"}>{about.cta.secondaryCta.label}</SmartLink>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
