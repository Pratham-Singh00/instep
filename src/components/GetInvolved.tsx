import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  Calendar,
  Heart,
  ArrowRight,
  CheckCircle,
  Building,
  Target
} from "lucide-react";

const GetInvolved = () => {
  const businessServices = [
    {
      icon: Briefcase,
      title: "Corporate Mental Health Programs",
      description: "Comprehensive workplace mental health solutions including employee assistance programs, stress management workshops, and leadership training.",
      features: ["Employee Counseling", "Stress Management", "Leadership Training", "Crisis Response"]
    },
    {
      icon: Users,
      title: "Community Partnerships",
      description: "Partner with us to bring mental health services to your organization or community group through tailored programs and workshops.",
      features: ["Custom Workshops", "Group Training", "Community Outreach", "Professional Development"]
    },
    {
      icon: Building,
      title: "Training & Consultation",
      description: "Professional training services for healthcare providers, social workers, and other professionals in trauma-informed care and evidence-based practices.",
      features: ["Professional Training", "Consultation Services", "Continuing Education", "Certification Programs"]
    },
    {
      icon: Target,
      title: "Specialized Program Development",
      description: "Work with us to develop custom programs for specific populations, including reentry support, domestic violence recovery, and parenting skills.",
      features: ["Program Design", "Implementation Support", "Outcome Measurement", "Staff Training"]
    }
  ];

  const partnerships = [
    {
      title: "Healthcare Organizations",
      description: "Collaborate with hospitals, clinics, and healthcare systems to provide integrated mental health services."
    },
    {
      title: "Educational Institutions",
      description: "Partner with schools, colleges, and universities to support student mental health and staff wellness."
    },
    {
      title: "Legal & Justice System",
      description: "Work with courts, probation offices, and legal organizations to provide specialized reentry and rehabilitation services."
    },
    {
      title: "Community Organizations",
      description: "Join forces with nonprofits, faith-based organizations, and community centers to expand access to mental health care."
    }
  ];

  return (
    <section id="get-involved" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Partner With Us
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our mission to expand access to quality mental health care through strategic 
            partnerships, professional services, and community collaboration.
          </p>
        </div>

        {/* Business Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Professional Services
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer comprehensive mental health solutions for organizations, 
              businesses, and professional groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="card-elevated hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <Icon className="h-6 w-6 text-primary" />
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
                    <Button className="w-full btn-hero">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Partnership Opportunities */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Partnership Opportunities
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We actively seek partnerships with organizations that share our commitment 
              to improving mental health outcomes in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerships.map((partnership) => (
              <Card key={partnership.title} className="card-elevated p-6 hover:scale-105 transition-all duration-300">
                <CardContent className="p-0">
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {partnership.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {partnership.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact for Partnerships */}
        <div className="text-center">
          <Card className="card-elevated max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Start a Partnership
              </CardTitle>
              <CardDescription>
                Ready to work together? Contact us to discuss how we can collaborate 
                to better serve our community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Whether you're looking for professional training, employee mental health programs, 
                  or community partnership opportunities, we'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero" asChild>
                    <a href="#contact">Contact Us</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:703-876-8480">Call 703-876-8480</a>
                  </Button>
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