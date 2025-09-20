import { Heart, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Individual Therapy", href: "#services" },
      { name: "Group Therapy", href: "#services" },
      { name: "Family Therapy", href: "#services" },
      { name: "Psychological Testing", href: "#services" }
    ],
    programs: [
      { name: "DBT Skills Groups", href: "#programs" },
      { name: "Reentry Support", href: "#programs" },
      { name: "Domestic Violence Support", href: "#programs" },
      { name: "Youth Programs", href: "#programs" }
    ],
    resources: [
      { name: "Crisis Support", href: "#contact" },
      { name: "Community Workshops", href: "#programs" },
      { name: "Mental Health Resources", href: "#" },
      { name: "Insurance Information", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "Careers", href: "#" },
      { name: "Privacy Policy", href: "#" }
    ]
  };

  const emergencyResources = [
    { name: "Crisis Hotline", number: "988", description: "24/7 Crisis Support" },
    { name: "Emergency", number: "911", description: "Life-threatening emergencies" },
    { name: "Domestic Violence", number: "1-800-799-7233", description: "National hotline" }
  ];

  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Emergency Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              <span className="font-semibold">Crisis Support Available 24/7</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {emergencyResources.map((resource) => (
                <a
                  key={resource.name}
                  href={`tel:${resource.number}`}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {resource.name}: {resource.number}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                In Step <span className="text-primary">- - -</span>
              </h3>
              <p className="text-navy-foreground/80 leading-relaxed">
                Walking in step with you on your journey. For nearly 30 years, 
                we've been providing comprehensive mental health services and 
                community support programs.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:703-876-8480" className="hover:text-primary transition-colors">
                  703-876-8480
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@insteppc.com" className="hover:text-primary transition-colors">
                  info@insteppc.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Northern Virginia Area</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold">Stay Connected</h4>
              <p className="text-sm text-navy-foreground/80">
                Get updates on our programs, workshops, and mental health resources.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-navy-foreground/10 border border-navy-foreground/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="btn-hero px-4 py-2 text-sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-navy-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-navy-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-navy-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-navy-foreground/60">
              © {currentYear} In Step PC. All rights reserved. Licensed mental health practice.
            </div>
            <div className="flex items-center gap-6 text-sm text-navy-foreground/60">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;