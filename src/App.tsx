import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Simulations from "./pages/Simulations";
import FlowchartSim from "./pages/sim/FlowchartSim";
import PatternSim from "./pages/sim/PatternSim";
import BiasSim from "./pages/sim/BiasSim";
import LifecycleSim from "./pages/sim/LifecycleSim";
import DecomposeSim from "./pages/sim/DecomposeSim";
import AbstractionSim from "./pages/sim/AbstractionSim";
import ChatbotSim from "./pages/sim/ChatbotSim";
import ClassifierSim from "./pages/sim/ClassifierSim";
import SearchSim from "./pages/sim/SearchSim";
import EthicsSim from "./pages/sim/EthicsSim";
import Quizzes from "./pages/Quizzes";
import QuizDetail from "./pages/QuizDetail";
import Workshop from "./pages/Workshop";
import Ethics from "./pages/Ethics";
import Glossary from "./pages/Glossary";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/:slug" element={<ClassDetail />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/simulations/flowchart" element={<FlowchartSim />} />
            <Route path="/simulations/pattern" element={<PatternSim />} />
            <Route path="/simulations/bias" element={<BiasSim />} />
            <Route path="/simulations/lifecycle" element={<LifecycleSim />} />
            <Route path="/simulations/decompose" element={<DecomposeSim />} />
            <Route path="/simulations/abstraction" element={<AbstractionSim />} />
            <Route path="/simulations/chatbot" element={<ChatbotSim />} />
            <Route path="/simulations/classifier" element={<ClassifierSim />} />
            <Route path="/simulations/search" element={<SearchSim />} />
            <Route path="/simulations/ethics" element={<EthicsSim />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:slug" element={<QuizDetail />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/ethics" element={<Ethics />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
