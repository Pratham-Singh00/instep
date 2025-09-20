import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin,
  Award,
  GraduationCap,
  Calendar,
  Users
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// WordPress integration structure for team members
interface TeamMember {
  id: number;
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  image: string;
  specialties: string[];
  languages: string[];
  email?: string;
  phone?: string;
  experience_years: number;
  education: string[];
  slug: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample team members - replace with WordPress API calls
  const sampleTeamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Clinical Director & Licensed Psychologist",
      credentials: ["Ph.D.", "Licensed Psychologist"],
      bio: "Dr. Johnson brings over 15 years of experience in clinical psychology with a specialization in trauma-informed care and DBT. She is passionate about creating inclusive therapeutic environments that empower individuals to heal and thrive.",
      image: "/api/placeholder/300/400",
      specialties: ["Trauma Therapy", "DBT", "Group Therapy", "Domestic Violence Recovery"],
      languages: ["English", "Spanish"],
      email: "sarah@insteppc.com",
      phone: "703-876-8480",
      experience_years: 15,
      education: ["Ph.D. Clinical Psychology - George Washington University", "M.A. Psychology - American University"],
      slug: "dr-sarah-johnson"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Licensed Clinical Social Worker",
      credentials: ["LCSW", "ACSW"],
      bio: "Michael specializes in reentry support and community-based interventions. His lived experience and professional training create a unique perspective that resonates with clients navigating life transitions and systemic challenges.",
      image: "/api/placeholder/300/400",
      specialties: ["Reentry Support", "Substance Abuse", "Men's Groups", "Community Therapy"],
      languages: ["English", "Spanish"],
      email: "michael@insteppc.com",
      experience_years: 8,
      education: ["MSW - Virginia Commonwealth University", "B.A. Social Work - George Mason University"],
      slug: "michael-rodriguez"
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      title: "Licensed Professional Counselor",
      credentials: ["LPC", "NCC"],
      bio: "Jennifer brings a compassionate approach to individual and family therapy, with extensive experience in domestic violence recovery and parenting support. She believes in the power of resilience and the strength that exists within every individual.",
      image: "/api/placeholder/300/400",
      specialties: ["Domestic Violence Recovery", "Family Therapy", "Parenting Skills", "Individual Counseling"],
      languages: ["English", "Spanish"],
      email: "jennifer@insteppc.com",
      experience_years: 12,
      education: ["M.A. Counseling Psychology - Marymount University", "B.S. Psychology - James Madison University"],
      slug: "jennifer-martinez"
    },
    {
      id: 4,
      name: "Dr. Lisa Chen",
      title: "Licensed Psychologist",
      credentials: ["Psy.D.", "Licensed Psychologist"],
      bio: "Dr. Chen specializes in psychological testing and assessment, with particular expertise in ADHD, learning differences, and developmental assessments. She provides comprehensive evaluations that inform treatment planning and educational support.",
      image: "/api/placeholder/300/400",
      specialties: ["Psychological Testing", "ADHD Assessment", "Learning Disabilities", "Child Psychology"],
      languages: ["English", "Mandarin"],
      email: "lisa@insteppc.com",
      experience_years: 10,
      education: ["Psy.D. Clinical Psychology - Alliant International University", "M.A. Psychology - Johns Hopkins University"],
      slug: "dr-lisa-chen"
    }
  ];

  useEffect(() => {
    // Simulate API call - replace with actual WordPress API integration
    const fetchTeamMembers = async () => {
      setLoading(true);
      // TODO: Replace with actual WordPress REST API call
      // const response = await fetch('/wp-json/wp/v2/team-members');
      // const data = await response.json();
      
      setTimeout(() => {
        setTeamMembers(sampleTeamMembers);
        setLoading(false);
      }, 1000);
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                Our Team
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Meet our dedicated team of licensed professionals who are committed to 
                providing compassionate, evidence-based mental health care to our community.
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="card-elevated animate-pulse overflow-hidden">
                    <div className="h-80 bg-muted"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map(member => (
                  <Card key={member.id} className="card-elevated hover:scale-105 transition-all duration-300 overflow-hidden group">
                    {/* Banner-style image at top */}
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Name overlay on image */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {member.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {member.credentials.map(credential => (
                            <Badge key={credential} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                              {credential}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content below image */}
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-primary mb-2">
                          {member.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="h-3 w-3" />
                          <span>{member.experience_years} years experience</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                        {member.bio}
                      </p>

                      {/* Specialties */}
                      <div className="mb-4">
                        <h5 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                          Specialties
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.slice(0, 3).map(specialty => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {member.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="mb-4">
                        <h5 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                          Languages
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {member.languages.map(language => (
                            <Badge key={language} variant="secondary" className="text-xs">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Education */}
                      <div className="mb-6">
                        <h5 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                          Education
                        </h5>
                        <div className="space-y-1">
                          {member.education.map((edu, index) => (
                            <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <GraduationCap className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{edu}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-2 pt-4 border-t border-muted">
                        {member.email && (
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs p-2" asChild>
                            <a href={`mailto:${member.email}`}>
                              <Mail className="h-3 w-3 mr-2" />
                              Contact
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* WordPress Integration Note */}
            <div className="mt-16 p-6 bg-muted/30 rounded-lg border border-muted">
              <h3 className="text-lg font-semibold mb-2 text-foreground flex items-center gap-2">
                <Users className="h-5 w-5" />
                WordPress Team Management
              </h3>
              <p className="text-muted-foreground mb-4">
                Team member profiles can be easily managed through WordPress admin panel. 
                Add new team members, update photos, credentials, and specialties directly in WordPress.
              </p>
              <div className="text-sm text-muted-foreground">
                <strong>Custom Post Type:</strong> <code>team-members</code><br/>
                <strong>API Endpoint:</strong> <code>/wp-json/wp/v2/team-members</code><br/>
                <strong>Custom Fields:</strong> Credentials, specialties, languages, education, contact info<br/>
                <strong>Featured Images:</strong> Professional headshots managed in WordPress media library
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;