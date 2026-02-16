import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { SmartLink } from "@/components/SmartLink";
import type { NavMenuItem } from "@/types/content";
import logoImage from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    content: {
      navigation: { phone, logoText, logoAccent, clientPortal, primaryCta, menu },
    },
  } = useContent();

  const normalizedMenu = useMemo(
    () =>
      menu.map((item: NavMenuItem) => ({
        ...item,
        href: item.href || "#",
      })),
    [menu],
  );

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-navy/20">
      <div className="container mx-auto px-4">
        {/* Top bar with phone */}
        <div className="flex items-center justify-between py-1 border-b border-navy-foreground/20">
          <div className="flex items-center space-x-2 text-navy-foreground text-sm">
            <Phone className="h-4 w-4" />
            <span className="font-medium">{phone}</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <SmartLink href={clientPortal.url || "#"}>{clientPortal.label}</SmartLink>
            </Button>
            <Button className="btn-hero text-sm px-4 py-2" asChild>
              <SmartLink href={primaryCta.url || "#contact"}>{primaryCta.label}</SmartLink>
            </Button>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center">
            <SmartLink
              href="/"
              className="cursor-pointer"
            >
              <img src={logoImage} alt="In Step Community Connect" className="h-14 w-auto" />
            </SmartLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {normalizedMenu.map((item) => (
              <SmartLink
                key={item.label}
                href={item.href}
                className="text-navy-foreground hover:text-primary transition-colors duration-200 font-medium link-underline cursor-pointer"
              >
                {item.label}
              </SmartLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-navy-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-navy-foreground/20">
            <nav className="flex flex-col space-y-4">
              {normalizedMenu.map((item) => (
                <SmartLink
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-navy-foreground hover:text-primary transition-colors duration-200 font-medium py-2 cursor-pointer"
                >
                  {item.label}
                </SmartLink>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-navy-foreground/20">
                <Button
                  variant="outline"
                  className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  asChild
                >
                  <SmartLink href={clientPortal.url || "#"}>{clientPortal.label}</SmartLink>
                </Button>
                <Button className="btn-hero" asChild>
                  <SmartLink href={primaryCta.url || "#contact"}>{primaryCta.label}</SmartLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
