import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, Target, Database, Brain, FlaskConical, Lightbulb } from "lucide-react";
import SimHelp from "@/components/SimHelp";

const phases = [
  { key: "define", title: "Define the Problem", icon: Target, color: "var(--grade-3)", prompt: "What problem are you solving?", placeholder: "e.g., Taking class attendance is slow and error-prone." },
  { key: "collect", title: "Collect Data", icon: Database, color: "var(--grade-4)", prompt: "What data will you gather?", placeholder: "e.g., Photos of each student in different lighting and angles." },
  { key: "build", title: "Train / Build", icon: Brain, color: "var(--grade-6)", prompt: "Which tool or method will train the model?", placeholder: "e.g., Use Google Teachable Machine to train an image classifier." },
  { key: "test", title: "Test", icon: FlaskConical, color: "var(--grade-7)", prompt: "How will you check for bias and edge cases?", placeholder: "e.g., Test with students wearing glasses, masks, or in dim light." },
  { key: "reflect", title: "Reflect", icon: Lightbulb, color: "var(--grade-8)", prompt: "What worked? What about ethics and privacy?", placeholder: "e.g., Faster than manual roll-call, but who owns the photos?" },
];

export default function LifecycleSim() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const phase = phases[step];

  const set = (val: string) => setAnswers(a => ({ ...a, [phase.key]: val }));
  const reset = () => { setStep(0); setAnswers({}); };
  const done = step === phases.length - 1 && answers[phase.key]?.trim();

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">AI Project Lifecycle</h1>
        <SimHelp
          title="AI Project Lifecycle"
          goal="Plan a real AI project end-to-end the way professional teams do — from problem to reflection."
          steps={[
            "Pick any AI idea you'd like to build (think school, home, or community).",
            "At each stage, type 1–3 sentences answering the prompt. Don't overthink — short is fine.",
            "Click 'Next stage' to move forward. You can click any circle to revisit a stage.",
            "After the final stage, your full Project Blueprint appears at the bottom."
          ]}
          examples={[
            "Define: 'Library books are often misplaced. We want an AI to suggest the right shelf.'",
            "Collect: 'Photos of every book cover + their correct shelf number.'",
            "Build: 'Train an image classifier in Google Teachable Machine.'",
            "Test: 'Try damaged covers, dim light, books we never showed it.'",
            "Reflect: 'Saves librarian time, but who can see the photos? Need a privacy policy.'"
          ]}
          tip="Stuck on what to build? Try: smart attendance, plant-disease detector, homework helper bot, lost-and-found matcher, or a weather-based outfit picker."
        />
      </div>
      <p className="text-muted-foreground mb-8">Walk a real-world idea through the five stages used by professional AI teams.</p>

      {/* Progress bar */}
      <div className="flex items-center justify-between mb-8 gap-2">
        {phases.map((p, i) => {
          const isDone = !!answers[p.key];
          const isCurrent = i === step;
          return (
            <div key={p.key} className="flex-1 flex flex-col items-center gap-2 text-center">
              <button
                onClick={() => setStep(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-[var(--shadow-soft)] transition-all ${isCurrent ? "scale-110 ring-4 ring-primary/20" : ""}`}
                style={{ backgroundColor: isDone || isCurrent ? `hsl(${p.color})` : "hsl(var(--muted))" }}
                aria-label={p.title}
              >
                {isDone && !isCurrent ? <CheckCircle2 className="w-5 h-5" /> : <p.icon className="w-5 h-5" />}
              </button>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${isCurrent ? "text-foreground" : "text-muted-foreground"} hidden sm:block`}>{p.title}</span>
            </div>
          );
        })}
      </div>

      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[var(--shadow-elegant)]" style={{ backgroundColor: `hsl(${phase.color})` }}>
            <phase.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Stage {step + 1} of {phases.length}</div>
            <h2 className="font-display font-bold text-2xl">{phase.title}</h2>
          </div>
        </div>
        <label className="text-sm font-semibold mb-2 block">{phase.prompt}</label>
        <textarea
          value={answers[phase.key] || ""}
          onChange={e => set(e.target.value)}
          placeholder={phase.placeholder}
          rows={4}
          className="w-full rounded-xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex items-center justify-between mt-5">
          <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft className="w-4 h-4 mr-1" />Back</Button>
          {step < phases.length - 1 ? (
            <Button className="bg-gradient-hero" onClick={() => setStep(step + 1)} disabled={!answers[phase.key]?.trim()}>Next stage <ArrowRight className="w-4 h-4 ml-1" /></Button>
          ) : (
            <Button variant="ghost" onClick={reset}><RefreshCw className="w-4 h-4 mr-1" />Start over</Button>
          )}
        </div>
      </div>

      {done && (
        <div className="card-elevated p-6 mt-6 bg-gradient-to-br from-success/10 to-primary/5 border-success/30">
          <h3 className="font-display font-bold text-lg mb-3">🎉 Your AI Project Blueprint</h3>
          <ol className="space-y-3">
            {phases.map(p => (
              <li key={p.key} className="text-sm">
                <strong className="text-foreground">{p.title}:</strong> <span className="text-muted-foreground">{answers[p.key]}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">This is exactly the same lifecycle used to build enterprise LLMs and RAG systems — the steps don't change, only the scale.</p>
        </div>
      )}
    </div>
  );
}
