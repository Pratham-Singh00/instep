import { SmartLink } from "@/components/SmartLink";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const Testimonials = () => {
  const {
    content: { testimonials },
  } = useContent();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">{testimonials.heading}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {testimonials.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.items.map((testimonial, index) => (
            <Card key={index} className="card-elevated p-6 relative h-full flex flex-col">
              <CardContent className="p-0 flex flex-col flex-1">
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Quote className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic flex-grow">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-border pt-4 mt-auto">
                  <div className="font-semibold text-foreground mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-primary font-medium mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card-elevated p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{testimonials.cta.heading}</h3>
            <p className="text-lg text-muted-foreground mb-8">
              {testimonials.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SmartLink className="btn-hero" href={testimonials.cta.primaryCta.url || "#"}>
                {testimonials.cta.primaryCta.label}
              </SmartLink>
              {testimonials.cta.secondaryCta ? (
                <SmartLink className="btn-secondary" href={testimonials.cta.secondaryCta.url || "#"}>
                  {testimonials.cta.secondaryCta.label}
                </SmartLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
