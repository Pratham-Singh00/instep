import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Users, 
  Home, 
  BookOpen, 
  Briefcase,
  ArrowRight,
  Clock,
  MapPin
} from "lucide-react";

const CommunityPrograms = () => {
  const programs = [
    {
      icon: Shield,
      title: "Reentry Support Program",
      description: "Comprehensive support for individuals transitioning back into the community, including counseling, life skills training, and resource connection.",
      duration: "12-week program",
      location: "Group & Individual Sessions",
      features: ["Individual counseling", "Job readiness training", "Housing assistance", "Peer support groups"],
      badge: "New Program",
      badgeVariant: "default" as const
    },
    {
      icon: Heart,
      title: "Domestic Violence Support",
      description: "Safe, confidential support for survivors of domestic violence with trauma-informed care and empowerment-focused interventions.",
      duration: "Ongoing support",
      location: "Safe, private setting",
      features: ["Crisis intervention", "Safety planning", "Trauma therapy", "Legal advocacy support"],
      badge: "24/7 Support",
      badgeVariant: "secondary" as const
    },
    {
      icon: Users,
      title: "DBT Skills Groups",
      description: "Dialectical Behavior Therapy skills training in a supportive group environment, focusing on mindfulness, emotion regulation, and interpersonal effectiveness.",
      duration: "16-week cycles",
      location: "Group therapy rooms",
      features: ["Mindfulness training", "Emotion regulation", "Distress tolerance", "Interpersonal skills"],
      badge: "Evidence-Based",
      badgeVariant: "outline" as const
    },
    {
      icon: BookOpen,
      title: "Stepping Stones (Youth)",
      description: "Social skills development for children and teens, focusing on building healthy relationships and emotional intelligence.",
      duration: "8-12 weeks",
      location: "Youth-friendly spaces", 
      features: ["Social skills training", "Peer interaction", "Confidence building", "Parent involvement"],
      badge: "Ages 8-18",
      badgeVariant: "secondary" as const
    },
    {
      icon: Home,
      title: "Parenting Skills Program",
      description: "Evidence-based parenting education and support to strengthen family relationships and improve communication.",
      duration: "10-week program",
      location: "Family therapy rooms",
      features: ["Communication skills", "Boundary setting", "Discipline strategies", "Family dynamics"],
      badge: "Family-Focused",
      badgeVariant: "outline" as const
    },
    {
      icon: Briefcase,
      title: "Community Workshops",
      description: "Educational workshops on mental health topics, stress management, and wellness strategies for community members.",
      duration: "Monthly events",
      location: "Community center",
      features: ["Mental health education", "Stress management", "Wellness strategies", "Community building"],
      badge: "Free to Public",
      badgeVariant: "default" as const
    }
  ];

  return (
    <section id="programs" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Community Programs
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Beyond traditional therapy, we offer specialized community programs designed to support 
            individuals and families facing unique challenges and transitions.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program) => {
            const Icon = program.icon;
            
            return (
              <Card key={program.title} className="card-elevated group hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                  </div>
                  
                  <Badge variant={program.badgeVariant} className="mb-3">
                    {program.badge}
                  </Badge>
                  
                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
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
                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full btn-hero group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact Banner */}
        <div className="card-elevated p-8 text-center border-l-4 border-l-destructive">
          <h3 className="text-xl font-bold mb-4 text-destructive">
            Crisis Support Available 24/7
          </h3>
          <p className="text-muted-foreground mb-6">
            If you or someone you know is in crisis or experiencing domestic violence, 
            immediate help is available. Don't wait – reach out now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="destructive" className="font-semibold">
              Crisis Hotline: 988
            </Button>
            <Button className="btn-hero">
              Contact Our Crisis Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPrograms;