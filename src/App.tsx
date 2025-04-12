
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmberTotem from "./pages/EmberTotem";
import FeedingZone from "./pages/FeedingZone";
import TrainingGround from "./pages/TrainingGround";
import LavaLeaderboard from "./pages/LavaLeaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmberTotem />} />
          <Route path="/feeding" element={<FeedingZone />} />
          <Route path="/training" element={<TrainingGround />} />
          <Route path="/leaderboard" element={<LavaLeaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
