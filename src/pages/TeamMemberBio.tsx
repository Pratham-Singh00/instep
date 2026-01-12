import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { teamMembers } from "@/data/teamMembers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Mail } from "lucide-react";

const TeamMemberBio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentIndex = teamMembers.findIndex((m) => m.id === id);
  const member = teamMembers[currentIndex];

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Team Member Not Found</h1>
        <Button onClick={() => navigate("/team")}>Back to Team</Button>
      </div>
    );
  }

  const prevMember = currentIndex > 0 ? teamMembers[currentIndex - 1] : null;
  const nextMember = currentIndex < teamMembers.length - 1 ? teamMembers[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-8 pl-0 hover:bg-transparent hover:text-primary"
            onClick={() => navigate("/team")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>

          <div className="flex flex-col md:flex-row gap-12 items-start max-w-5xl mx-auto mb-16">
            <div className="flex-1 order-2 md:order-1">
              <h1 className="text-4xl font-bold mb-2 text-foreground">
                {member.name}
              </h1>
              <div className="text-xl text-primary font-medium mb-8">
                {member.qualification}
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-left">
                {member.bio}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 order-1 md:order-2 md:w-80 flex-shrink-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {member.email && (
                <div className="flex items-center gap-2 text-primary font-medium bg-muted/30 px-4 py-2 rounded-full">
                  <Mail className="h-5 w-5" />
                  <a href={`mailto:${member.email}`} className="hover:underline">
                    {member.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-5xl mx-auto flex justify-between border-t border-border pt-8">
            {prevMember ? (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/team/${prevMember.id}`)}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground font-normal">Previous</div>
                  <div>{prevMember.name}</div>
                </div>
              </Button>
            ) : (
              <div /> // Spacer
            )}

            {nextMember ? (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/team/${nextMember.id}`)}
                className="flex items-center gap-2"
              >
                <div className="text-right">
                  <div className="text-xs text-muted-foreground font-normal">Next</div>
                  <div>{nextMember.name}</div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <div /> // Spacer
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamMemberBio;
