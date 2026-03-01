import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContentProvider } from "@/context/ContentContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Static Imports (Restored for stability)
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Team from "./pages/Team";
import TeamMemberBio from "./pages/TeamMemberBio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Always use BrowserRouter for better SEO and cleaner URLs
// WordPress rewrite rules ensure all routes serve the React app
const RouterComponent = BrowserRouter;

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ContentProvider>
            <RouterComponent>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:id" element={<TeamMemberBio />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouterComponent>
          </ContentProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
