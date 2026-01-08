import { SmartLink } from "@/components/SmartLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Heart } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { getIconByName } from "@/lib/icon-map";

const GetInvolved = () => {
  const {
    content: { getInvolved },
  } = useContent();

  return (
    <section id="get-involved" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">{getInvolved.heading}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {getInvolved.description}
          </p>
        </div>

        {/* Business Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{getInvolved.businessServicesHeading}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getInvolved.businessServicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getInvolved.businessServices.map((service) => {
              const Icon = getIconByName(service.icon);
              return (
                <Card key={service.title} className="card-elevated hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      {Icon ? <Icon className="h-6 w-6 text-primary" /> : null}
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {service.cta ? (
                      <Button className="w-full btn-hero" asChild>
                        <SmartLink href={service.cta.url || "#"}>
                          {service.cta.label}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </SmartLink>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact for Business Services */}
        <div className="text-center">
          <Card className="card-elevated max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                {getInvolved.cta.heading}
              </CardTitle>
              <CardDescription>
                {getInvolved.cta.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero" asChild>
                    <SmartLink href={getInvolved.cta.primaryCta.url || "#"}>{getInvolved.cta.primaryCta.label}</SmartLink>
                  </Button>
                  {getInvolved.cta.secondaryCta ? (
                    <Button variant="outline" asChild>
                      <SmartLink href={getInvolved.cta.secondaryCta.url || "#"}>
                        {getInvolved.cta.secondaryCta.label}
                      </SmartLink>
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
