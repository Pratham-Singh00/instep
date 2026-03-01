import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SmartLink } from "@/components/SmartLink";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <SEO
        title="Page Not Found | InStep PC"
        description="The page you requested could not be found. Visit InStep PC to explore mental health services and resources."
        url={location.pathname}
        noindex
      />
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-primary/20 mb-2">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-hero" asChild>
            <SmartLink href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </SmartLink>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
