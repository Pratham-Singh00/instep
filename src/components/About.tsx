import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Heart, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Target
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We believe in treating every individual with dignity, respect, and genuine empathy throughout their healing journey."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Our programs are designed to strengthen the entire community, creating lasting positive change for all."
    },
    {
      icon: Shield,
      title: "Safe & Inclusive",
      description: "We provide a safe, welcoming environment where everyone feels valued regardless of their background or circumstances."
    },
    {
      icon: Target,
      title: "Evidence-Based",
      description: "All our interventions are grounded in research and proven therapeutic approaches for maximum effectiveness."
    }
  ];

  const achievements = [
    { number: "30+", label: "Years of Service", icon: Award },
    { number: "1,000+", label: "Lives Impacted", icon: Heart },
    { number: "50+", label: "Group Programs", icon: Users },
    { number: "95%", label: "Client Satisfaction", icon: Star }
  ];

  const certifications = [
    "Licensed Clinical Social Workers",
    "Trauma-Informed Care Certified",
    "DBT Skills Training Certified", 
    "Crisis Intervention Specialists",
    "LGBTQ+ Affirming Therapy",
    "Culturally Responsive Practice"
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            The In Step Difference
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For nearly 30 years, In Step has been a beacon of hope in our community, 
            providing comprehensive mental health services with a focus on inclusion, healing, and empowerment.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Our Story */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Our Story & Mission
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with the vision of walking alongside individuals on their mental health journey, 
                In Step has grown from a small practice to a comprehensive community mental health center 
                serving diverse populations with specialized care.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We specialize in offering a wide range of group treatments including our renowned DBT skills groups, 
                Stepping Stones social skills for children and teens, and innovative programs for reentry support 
                and domestic violence survivors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team takes special care to match individuals with appropriate support chronologically, 
                developmentally, and emotionally, ensuring that every person receives the most effective 
                and personalized care possible.
              </p>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-foreground">
                Our Expertise & Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certifications.map((cert, index) => (
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
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Our Impact
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <Card key={achievement.label} className="card-elevated text-center p-6">
                    <CardContent className="p-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {achievement.number}
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
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="card-elevated text-center p-6 group hover:scale-105 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Join Our Community of Healing
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the In Step difference for yourself. Our compassionate team is ready to 
              walk alongside you on your journey toward mental wellness and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero group">
                Schedule Your First Visit
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="btn-secondary">
                Learn More About Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;