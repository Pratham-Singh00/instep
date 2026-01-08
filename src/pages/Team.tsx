import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  GraduationCap,
  Calendar,
  Users
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import type { TeamMemberContent } from "@/types/content";

const Team = () => {
  const {
    content: { team },
    hasWordPressSource,
  } = useContent();

  const [teamMembers, setTeamMembers] = useState<TeamMemberContent[]>(team.members);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wpBridge = typeof window !== "undefined" ? window.instepCommunityConnect : undefined;

  useEffect(() => {
    // Load team members from WordPress when available
    const fetchTeamMembers = async () => {
      setLoading(true);
      setError(null);

      if (!wpBridge?.endpoints?.team) {
        setTeamMembers(team.members);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${wpBridge.endpoints.team}?per_page=50`);
        if (!response.ok) {
          throw new Error(`Failed to load team (${response.status})`);
        }

        const data = await response.json();
        const mapped: TeamMemberContent[] = data.map((member: any) => ({
          name: member.name ?? "Team Member",
          title: member.title ?? "",
          credentials: member.credentials ?? [],
          bio: member.bio ?? "",
          image: member.image ?? "/api/placeholder/300/400",
          specialties: member.specialties ?? [],
          languages: member.languages ?? [],
          email: member.email ?? undefined,
          phone: member.phone ?? undefined,
          experienceYears: member.experienceYears ?? member.experience_years ?? undefined,
          education: member.education ?? [],
          location: member.location ?? "",
        }));

        setTeamMembers(mapped.length ? mapped : team.members);
      } catch (err) {
        console.error("Unable to load WordPress team members", err);
        setTeamMembers(team.members);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [wpBridge?.endpoints?.team, team.members]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                {team.heading}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {team.description}
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
                {teamMembers.map((member, index) => (
                  <Card key={`${member.name}-${index}`} className="card-elevated hover:scale-105 transition-all duration-300 overflow-hidden group">
                    {/* Banner-style image at top */}
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={member.image || "/api/placeholder/300/400"} 
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
                          <span>
                            {member.experienceYears
                              ? `${member.experienceYears} years experience`
                              : "Experience info coming soon"}
                          </span>
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
                        {member.email ? (
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs p-2" asChild>
                            <a href={`mailto:${member.email}`}>
                              <Mail className="h-3 w-3 mr-2" />
                              Email
                            </a>
                          </Button>
                        ) : null}
                        {member.phone ? (
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs p-2" asChild>
                            <a href={`tel:${member.phone}`}>
                              <Phone className="h-3 w-3 mr-2" />
                              Call
                            </a>
                          </Button>
                        ) : null}
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
                WordPress Team Management {hasWordPressSource && wpBridge?.endpoints?.team ? "Active" : "Ready"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {hasWordPressSource && wpBridge?.endpoints?.team
                  ? "Profiles below are synced from WordPress. Add or edit team members in the WordPress dashboard to update this page."
                  : "Activate the custom team endpoint in WordPress to manage profiles from the dashboard. Until then, the default team defined in settings is displayed."}
              </p>
              <div className="text-sm text-muted-foreground">
                <strong>REST Endpoint:</strong> <code>{wpBridge?.endpoints?.team ?? "/wp-json/instep/v1/team"}</code><br/>
                <strong>Custom Fields:</strong> Credentials, specialties, languages, education, contact info<br/>
                <strong>Featured Images:</strong> Professional headshots managed in WordPress media library
                {error ? (
                  <><br /><strong className="text-destructive">Error:</strong> {error}</>
                ) : null}
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
