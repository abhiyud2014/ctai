import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Scenario = {
  task: string;
  details: { label: string; essential: boolean; reason: string }[];
};

const scenarios: Scenario[] = [
  {
    task: "Designing a subway map",
    details: [
      { label: "Station names", essential: true, reason: "Riders need to know where to get off." },
      { label: "Line colours", essential: true, reason: "Helps distinguish routes at a glance." },
      { label: "Exact distance between stations", essential: false, reason: "Maps distort distance for clarity." },
      { label: "Building heights above ground", essential: false, reason: "Irrelevant to underground travel." },
      { label: "Transfer points", essential: true, reason: "Critical for changing lines." },
      { label: "Street-level traffic", essential: false, reason: "Not relevant once underground." },
    ],
  },
  {
    task: "Building a weather app",
    details: [
      { label: "Temperature", essential: true, reason: "The headline number users want." },
      { label: "Rain probability", essential: true, reason: "Drives decisions like umbrellas." },
      { label: "Atmospheric pressure in Pa", essential: false, reason: "Too technical for most users." },
      { label: "Wind speed", essential: true, reason: "Affects comfort and safety." },
      { label: "Cloud chemical composition", essential: false, reason: "Not useful for daily decisions." },
      { label: "Humidity %", essential: true, reason: "Important for comfort." },
    ],
  },
  {
    task: "Modeling a student for attendance",
    details: [
      { label: "Roll number", essential: true, reason: "Unique identifier." },
      { label: "Name", essential: true, reason: "Human-readable identity." },
      { label: "Favourite colour", essential: false, reason: "Has nothing to do with attendance." },
      { label: "Class section", essential: true, reason: "Determines which register they belong to." },
      { label: "Shoe size", essential: false, reason: "Irrelevant attribute." },
      { label: "Date and time of arrival", essential: true, reason: "The actual attendance signal." },
    ],
  },
];

export default function AbstractionSim() {
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const s = scenarios[idx];

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    s.details.forEach((d, i) => { if (!!picks[i] === d.essential) correct++; });
    return { correct, total: s.details.length };
  }, [submitted, picks, s]);

  const next = () => {
    setIdx((idx + 1) % scenarios.length);
    setPicks({});
    setSubmitted(false);
  };

  const reset = () => { setIdx(0); setPicks({}); setSubmitted(false); };

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Abstraction Sorter</h1>
        <SimHelp
          title="Abstraction Sorter"
          goal="Learn to keep only the details that matter for a task and ignore the rest — the heart of computational thinking."
          steps={[
            "Read the task at the top (e.g. 'Designing a subway map').",
            "For each detail, tick the box if it's essential to the task.",
            "Click 'Check answers' to see which you got right and why.",
            "Use the chips to switch between scenarios."
          ]}
          examples={[
            "Subway map → KEEP: station names, line colours, transfers. SKIP: exact distances, building heights.",
            "Weather app → KEEP: temperature, rain chance, wind. SKIP: pressure in Pascals, cloud chemistry."
          ]}
          tip="Ask: 'If I removed this detail, would the user still complete the task?' If yes, it's safe to abstract away."
        />
      </div>
      <p className="text-muted-foreground mb-6">Tick the details that <strong>matter</strong> for the task. Leave the rest unticked.</p>

      <div className="card-elevated p-6">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Task</div>
        <h2 className="font-display font-bold text-xl mb-5">{s.task}</h2>

        <div className="space-y-2">
          {s.details.map((d, i) => {
            const picked = !!picks[i];
            const isCorrect = submitted && picked === d.essential;
            const isWrong = submitted && picked !== d.essential;
            return (
              <label key={i} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isCorrect ? "bg-success/10 border-success" : isWrong ? "bg-destructive/10 border-destructive" : picked ? "bg-primary/10 border-primary" : "bg-card border-border hover:border-primary/40"}`}>
                <input
                  type="checkbox"
                  disabled={submitted}
                  checked={picked}
                  onChange={e => setPicks({ ...picks, [i]: e.target.checked })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{d.label}</div>
                  {submitted && (
                    <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                      {d.essential ? <Check className="w-3 h-3 text-success" /> : <X className="w-3 h-3 text-destructive" />}
                      {d.reason}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} className="mt-5 bg-gradient-hero w-full">Check my abstractions</Button>
        ) : (
          <div className="mt-5">
            <div className="text-center mb-3">
              <div className="text-2xl font-display font-bold gradient-text">{score!.correct}/{score!.total}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Correct picks</div>
            </div>
            <Button onClick={next} className="w-full bg-gradient-hero">Next scenario →</Button>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <Button variant="ghost" size="sm" onClick={reset}><RefreshCw className="w-4 h-4 mr-1" />Reset</Button>
      </div>
    </div>
  );
}
