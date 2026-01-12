import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { teamMembers } from "@/data/teamMembers";

const Team = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5 mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                Our Team
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Meet our dedicated team of professionals who are committed to providing compassionate care.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="flex flex-col items-center text-center cursor-pointer group"
                onClick={() => navigate(`/team/${member.id}`)}
              >
                <div className="relative mb-4 w-40 h-40 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary/20 transition-all duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                
                <span className="text-sm font-medium text-blue-600">
                  {member.qualification}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
