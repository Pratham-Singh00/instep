import { SmartLink } from "@/components/SmartLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { getIconByName } from "@/lib/icon-map";

const CommunityPrograms = () => {
  const {
    content: { programs },
  } = useContent();

  return (
    <section id="programs" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient pb-2 leading-relaxed">{programs.heading}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {programs.description}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.items.map((program) => {
            const Icon = getIconByName(program.icon);

            return (
              <Card key={program.title} className="card-elevated group hover:scale-105 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-none">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    {Icon ? <Icon className="h-8 w-8 text-primary" /> : null}
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                  </div>

                  {program.badge ? (
                    <Badge variant={program.badgeVariant} className="mb-3">
                      {program.badge}
                    </Badge>
                  ) : null}

                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col flex-grow">
                  {/* Program Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {program.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {program.location}
                    </div>
                  </div>

                  {/* Features List */}
                  {/* We use flex-grow here to push the button down if we wanted, but putting mt-auto on the button is safer if we want the features to stick to top */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {program.cta ? (
                    <Button className="w-full btn-hero group mt-auto" asChild>
                      <SmartLink href={program.cta.url || "#"}>
                        {program.cta.label}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </SmartLink>
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Emergency Contact Banner */}
        <div className="card-elevated p-8 text-center border-l-4 border-l-destructive">
          <h3 className="text-xl font-bold mb-4 text-destructive">{programs.crisisBanner.heading}</h3>
          <p className="text-muted-foreground mb-6">{programs.crisisBanner.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="destructive" className="font-semibold" asChild>
              <SmartLink href={programs.crisisBanner.primaryCta.url || "tel:988"}>
                {programs.crisisBanner.primaryCta.label}
              </SmartLink>
            </Button>
            {programs.crisisBanner.secondaryCta ? (
              <Button className="btn-hero" asChild>
                <SmartLink href={programs.crisisBanner.secondaryCta.url || "#"}>
                  {programs.crisisBanner.secondaryCta.label}
                </SmartLink>
              </Button>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CommunityPrograms;
