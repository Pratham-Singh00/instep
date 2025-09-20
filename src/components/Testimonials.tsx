import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "DBT Skills Group Participant",
      content: "The DBT skills group at In Step changed my life. I learned how to manage my emotions and build healthier relationships. The group was so supportive and the facilitators were amazing.",
      rating: 5,
      location: "Arlington, VA"
    },
    {
      name: "Michael R.",
      role: "Reentry Program Graduate",
      content: "Coming back to the community was scary, but the reentry program gave me the tools and support I needed. They helped me find housing, employment, and most importantly, hope for the future.",
      rating: 5,
      location: "Alexandria, VA"
    },
    {
      name: "Jennifer L.",
      role: "Family Therapy Client",
      content: "Our family was struggling to communicate, but through family therapy at In Step, we learned to listen to each other and work through our problems together. We're stronger than ever now.",
      rating: 5,
      location: "Fairfax, VA"
    },
    {
      name: "David K.",
      role: "Individual Therapy Client",
      content: "After years of struggling with anxiety and depression, I finally found the right therapist at In Step. The individual attention and evidence-based approach made all the difference.",
      rating: 5,
      location: "Reston, VA"
    },
    {
      name: "Maria S.",
      role: "Domestic Violence Survivor", 
      content: "The support I received after leaving an abusive relationship was incredible. The staff understood my trauma and helped me rebuild my confidence and sense of safety. I'm forever grateful.",
      rating: 5,
      location: "Vienna, VA"
    },
    {
      name: "James T.",
      role: "Parent in Parenting Skills Program",
      content: "The parenting program taught me how to set boundaries while showing love and support. My relationship with my teenager has improved dramatically. Highly recommend to any parent struggling.",
      rating: 5,
      location: "McLean, VA"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Stories of Hope & Healing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from real people whose lives have been transformed through our programs and services. 
            Your story of healing could be next.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated p-6 relative">
              <CardContent className="p-0">
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
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of others who have found hope, healing, and transformation through 
              our compassionate mental health services and community programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Begin Your Healing Journey
              </button>
              <button className="btn-secondary">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;