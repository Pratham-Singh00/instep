import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Team from "./pages/Team";
import TeamMemberBio from "./pages/TeamMemberBio";
import NotFound from "./pages/NotFound";
import { ContentProvider } from "@/context/ContentContext";

const queryClient = new QueryClient();

const RouterComponent = typeof window !== "undefined" && window.instepCommunityConnect ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContentProvider>
        <RouterComponent>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:id" element={<TeamMemberBio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouterComponent>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
