import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { teamMembers } from "@/data/teamMembers";
import { SEO } from "@/components/SEO";
import { useContent } from "@/context/ContentContext";

const Team = () => {
  const navigate = useNavigate();
  const {
    content: { team },
  } = useContent();

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Team | InStep PC"
        description="Meet our dedicated team of licensed clinicians, therapists, and improved mental health professionals serving Northern Virginia."
        url="/team"
      />
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
              <div className="mt-8 p-6 bg-muted/30 rounded-lg inline-block text-center border border-muted">
                <p className="text-muted-foreground font-medium mb-2">
                  Interested in joining our team?
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfbzXO8ahPGr1RwdVHPjXa0C9N-IsQrTTUdqhonDhSaHYgJfg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-bold hover:underline text-lg"
                >
                  Apply Now!
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg bg-white transition-all duration-300 hover:shadow-lg hover:border-primary/50 group cursor-pointer"
                onClick={() => navigate(`/team/${member.id}`)}
              >
                <div className="relative mb-4 w-32 h-32 md:w-36 md:h-36 transition-transform duration-300 group-hover:scale-105 overflow-hidden rounded-lg shadow-md group-hover:shadow-lg flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover ${member.imagePosition || ""}`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                <h3 className="font-semibold text-sm md:text-base text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 w-full px-1">
                  {member.name}
                </h3>

                <span className="text-xs font-medium text-blue-600 mb-3 line-clamp-2 w-full px-1">
                  {member.qualification}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `mailto:${member.email}`;
                  }}
                  className="mt-auto px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90 transition-colors w-full"
                >
                  Email
                </button>
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
