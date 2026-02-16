import { type AnchorHTMLAttributes, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

/**
 * SmartLink component for WordPress HashRouter compatibility
 * Converts internal routes to hash routes automatically
 */
export const SmartLink = ({ href = "#", onClick, children, ...props }: SmartLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Handle hash links (anchors) -> Scroll to section
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const sectionId = href.substring(1);

      const scrollToSection = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Add offset for fixed header
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      };

      if (location.pathname !== "/") {
        // Navigate to home first
        navigate("/");
        // Wait for navigation and render
        setTimeout(scrollToSection, 300);
      } else {
        // Already on home, just scroll
        scrollToSection();
      }
      return;
    }

    // External links, special protocols, or empty hash
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href === "#"
    ) {
      return;
    }

    // Internal links handled by Link component naturally
  };

  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href === "#"
  ) {
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  // Use standard Link for everything else
  // If it's a hash link, we still use Link but intercept with onClick
  return (
    <Link to={href} onClick={handleClick} {...props as any}>
      {children}
    </Link>
  );
};
