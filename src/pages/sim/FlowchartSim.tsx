import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, CloudRain, Sun } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Step = { id: string; label: string; type: "start" | "step" | "decision" | "end"; yes?: string; no?: string; next?: string };

const flow: Record<string, Step> = {
  start: { id: "start", label: "Wake Up", type: "start", next: "brush" },
  brush: { id: "brush", label: "Brush teeth", type: "step", next: "uniform" },
  uniform: { id: "uniform", label: "Wear uniform", type: "step", next: "rain" },
  rain: { id: "rain", label: "Is it raining?", type: "decision", yes: "umbrella", no: "cap" },
  umbrella: { id: "umbrella", label: "Take Umbrella", type: "step", next: "school" },
  cap: { id: "cap", label: "Wear Cap", type: "step", next: "school" },
  school: { id: "school", label: "Go to School", type: "end" },
};

export default function FlowchartSim() {
  const [current, setCurrent] = useState("start");
  const [history, setHistory] = useState<string[]>(["start"]);
  const [raining, setRaining] = useState<boolean | null>(null);

  const step = flow[current];

  const advance = (nextId: string) => {
    setCurrent(nextId);
    setHistory(h => [...h, nextId]);
  };

  const reset = () => {
    setCurrent("start");
    setHistory(["start"]);
    setRaining(null);
  };

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Build a Flowchart</h1>
        <SimHelp
          title="Build a Flowchart"
          goal="See how a computer follows a step-by-step plan, including decisions that change the path."
          steps={[
            "Read each step as it lights up.",
            "When you reach the diamond ('Is it raining?'), click ☀️ Sunny or 🌧️ Raining.",
            "Watch the flow take a different branch based on your choice.",
            "Click Reset to try the other path."
          ]}
          tip="The diamond shape always means a decision. Every decision has exactly two outgoing arrows: Yes and No."
        />
      </div>
      <p className="text-muted-foreground mb-8">Follow the morning routine. Pick a weather option at the decision diamond and watch the path branch.</p>

      <div className="card-elevated p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-muted-foreground">Step <strong className="text-foreground">{history.length}</strong> · Current: <strong className="text-foreground">{step.label}</strong></div>
          <Button size="sm" variant="ghost" onClick={reset}><RefreshCw className="w-4 h-4 mr-1" />Restart</Button>
        </div>

        {/* Visual chain */}
        <div className="flex flex-col items-center gap-3">
          {history.map((id, i) => {
            const s = flow[id];
            const shape = s.type === "decision" ? "rotate-45" : "";
            const color = s.type === "start" || s.type === "end" ? "bg-success text-success-foreground" : s.type === "decision" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground";
            return (
              <div key={`${id}-${i}`} className="flex flex-col items-center">
                <div className={`min-w-[180px] px-5 py-3 rounded-xl ${color} font-semibold text-center shadow-[var(--shadow-soft)] ${s.type === "decision" ? "rounded-2xl" : ""}`}>
                  {s.label}
                </div>
                {i < history.length - 1 && <div className="w-px h-5 bg-border my-1" />}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-6 pt-6 border-t border-border">
          {step.type === "decision" ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Decision: <strong>{step.label}</strong></p>
              <div className="flex justify-center gap-3">
                <Button onClick={() => { setRaining(true); advance(step.yes!); }} className="bg-primary"><CloudRain className="w-4 h-4 mr-1" /> Yes — it's raining</Button>
                <Button onClick={() => { setRaining(false); advance(step.no!); }} variant="outline"><Sun className="w-4 h-4 mr-1" /> No — sunny day</Button>
              </div>
            </div>
          ) : step.type === "end" ? (
            <div className="text-center">
              <p className="text-success font-semibold mb-2">🎉 Routine complete!</p>
              <p className="text-sm text-muted-foreground">You followed an algorithm with a {raining ? "rainy" : "sunny"} branch.</p>
            </div>
          ) : (
            <div className="text-center">
              <Button size="lg" className="bg-gradient-hero" onClick={() => advance(step.next!)}>Next step →</Button>
            </div>
          )}
        </div>
      </div>

      <div className="card-elevated p-5 bg-primary/5">
        <h3 className="font-semibold mb-1">💡 What you just did</h3>
        <p className="text-sm text-muted-foreground">A flowchart is an algorithm with decision points. Computers follow these every day — like your phone deciding whether to vibrate or ring based on Silent mode.</p>
      </div>
    </div>
  );
}
