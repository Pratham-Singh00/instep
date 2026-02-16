import { Heart, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { SmartLink } from "@/components/SmartLink";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    content: { footer },
  } = useContent();

  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Emergency Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              <span className="font-semibold">{footer.emergencyBanner.heading}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {footer.emergencyBanner.resources.map((resource) => (
                <SmartLink
                  key={resource.label}
                  href={`tel:${resource.number}`}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {resource.label}: {resource.number}
                </SmartLink>
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
                {footer.about.heading} {footer.about.accent ? <span className="text-primary">{footer.about.accent}</span> : null}
              </h3>
              <p className="text-navy-foreground/80 leading-relaxed">
                {footer.about.description}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <SmartLink href={`tel:${footer.about.phone}`} className="hover:text-primary transition-colors">
                  {footer.about.phone}
                </SmartLink>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <SmartLink href={`mailto:${footer.about.email}`} className="hover:text-primary transition-colors">
                  {footer.about.email}
                </SmartLink>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{footer.about.location}</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold">{footer.newsletter.heading}</h4>
              <p className="text-sm text-navy-foreground/80">
                {footer.newsletter.description}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={footer.newsletter.placeholder}
                  className="flex-1 px-3 py-2 bg-navy-foreground/10 border border-navy-foreground/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="btn-hero px-4 py-2 text-sm" asChild>
                  <SmartLink href={footer.newsletter.cta.url || "#"} className="flex items-center gap-2">
                    <span>{footer.newsletter.cta.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </SmartLink>
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footer.links.services.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className="text-sm text-navy-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footer.links.programs.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className="text-sm text-navy-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footer.links.company.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className="text-sm text-navy-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </SmartLink>
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
              © {currentYear} {footer.about.heading}. All rights reserved. {footer.bottomBar.legal}
            </div>
            <div className="flex items-center gap-6 text-sm text-navy-foreground/60">
              {footer.bottomBar.links.map((link) => (
                <SmartLink key={link.label} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
