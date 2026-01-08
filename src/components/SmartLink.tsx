import { type AnchorHTMLAttributes, type MouseEvent } from "react";

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

/**
 * SmartLink component for WordPress HashRouter compatibility
 * Converts internal routes to hash routes automatically
 */
export const SmartLink = ({ href = "#", onClick, children, ...props }: SmartLinkProps) => {
  // Check if we're in WordPress environment
  const isWordPress = typeof window !== "undefined" && window.instepCommunityConnect;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // External links or special protocols - let browser handle normally
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    // For section anchors (#about, #services, etc.)
    if (href.startsWith("#") && !href.includes("/")) {
      e.preventDefault();
      const sectionId = href.substring(1);
      
      // Get current route
      const currentPath = isWordPress 
        ? window.location.hash.replace(/^#/, '').split('?')[0]
        : window.location.pathname;
      
      // If not on home page, navigate home first, then scroll
      if (currentPath !== "/" && currentPath !== "") {
        if (isWordPress) {
          window.location.hash = "/";
        } else {
          window.location.href = "/";
        }
        // Wait for navigation, then scroll
        setTimeout(() => {
          if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    // In WordPress, convert /routes to #/routes
    if (isWordPress && href.startsWith("/") && !href.startsWith("/#/")) {
      e.preventDefault();
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  };

  // Convert href for WordPress
  let finalHref = href;
  if (isWordPress && href.startsWith("/") && !href.startsWith("/#/") && !href.startsWith("#")) {
    finalHref = `#${href}`;
  }

  return (
    <a href={finalHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
