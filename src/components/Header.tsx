import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Programs", href: "#programs" },
    { name: "Get Involved", href: "#get-involved" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-navy/20">
      <div className="container mx-auto px-4">
        {/* Top bar with phone */}
        <div className="flex items-center justify-between py-2 border-b border-navy-foreground/20">
          <div className="flex items-center space-x-2 text-navy-foreground text-sm">
            <Phone className="h-4 w-4" />
            <span className="font-medium">703-876-8480</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Client Portal
            </Button>
            <Button className="btn-hero text-sm px-4 py-2">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-navy-foreground">
              In Step <span className="text-primary">- - -</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-navy-foreground hover:text-primary transition-colors duration-200 font-medium link-underline"
              >
                {item.name}
              </a>
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
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-navy-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-navy-foreground/20">
                <Button variant="outline" className="bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Client Portal
                </Button>
                <Button className="btn-hero">
                  Contact Us
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