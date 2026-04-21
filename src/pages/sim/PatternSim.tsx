import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Check, X } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Puzzle = { sequence: string[]; options: string[]; answer: string; rule: string };

const puzzles: Puzzle[] = [
  { sequence: ["🔴", "🔵", "🔴", "🔵", "🔴"], options: ["🔴", "🔵", "🟡"], answer: "🔵", rule: "Alternating red and blue." },
  { sequence: ["🟦", "🟦", "🟧", "🟦", "🟦", "🟧"], options: ["🟦", "🟧", "🟪"], answer: "🟦", rule: "Two blues, then one orange — the cycle repeats." },
  { sequence: ["1", "2", "4", "8", "16"], options: ["20", "24", "32"], answer: "32", rule: "Each number doubles." },
  { sequence: ["🌑", "🌒", "🌓", "🌔"], options: ["🌕", "🌖", "🌑"], answer: "🌕", rule: "Moon phases — next is full moon." },
  { sequence: ["A", "C", "E", "G"], options: ["H", "I", "J"], answer: "I", rule: "Skip one letter each time." },
];

export default function PatternSim() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [seen, setSeen] = useState(0);

  const p = puzzles[idx];
  const correct = picked === p.answer;

  const next = () => {
    setSeen(s => s + 1);
    if (correct) setScore(s => s + 1);
    setPicked(null);
    setIdx((idx + 1) % puzzles.length);
  };

  const reset = () => { setIdx(0); setPicked(null); setScore(0); setSeen(0); };

  const accuracy = useMemo(() => seen ? Math.round((score / seen) * 100) : 0, [score, seen]);

  return (
    <div className="container py-12 max-w-2xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="flex items-start gap-3">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Pattern Detective</h1>
            <SimHelp
              title="Pattern Detective"
              goal="Train your brain to spot the rule behind a sequence — the same skill AI uses to predict the next word, frame, or number."
              steps={[
                "Look at the sequence shown at the top.",
                "Ask: 'What rule turns each item into the next one?'",
                "Click the option you think comes next.",
                "Read the rule revealed, then press Next puzzle."
              ]}
              examples={[
                "🔴 🔵 🔴 🔵 🔴 → answer: 🔵 (alternating)",
                "1, 2, 4, 8, 16 → answer: 32 (each number doubles)"
              ]}
              tip="If stuck, say the sequence out loud. Your ear often catches rhythms your eyes miss."
            />
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold gradient-text">{score}/{seen}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{accuracy}% accuracy</div>
        </div>
      </div>

      <div className="card-elevated p-8">
        <div className="flex items-center justify-center gap-3 text-4xl mb-2 flex-wrap">
          {p.sequence.map((it, i) => (
            <span key={i} className="px-4 py-3 rounded-xl bg-muted">{it}</span>
          ))}
          <span className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-dashed border-primary text-primary font-bold">?</span>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6 mb-4">Pick the next item:</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {p.options.map(opt => {
            const isPicked = picked === opt;
            const isAnswer = opt === p.answer;
            const colorClass = picked
              ? isAnswer ? "bg-success text-success-foreground border-success"
                : isPicked ? "bg-destructive text-destructive-foreground border-destructive"
                : "bg-muted text-muted-foreground border-border"
              : "bg-card hover:bg-primary/10 hover:border-primary border-border";
            return (
              <button
                key={opt}
                disabled={!!picked}
                onClick={() => setPicked(opt)}
                className={`text-3xl px-6 py-4 rounded-xl border-2 font-bold transition-all ${colorClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked && (
          <div className={`mt-6 p-4 rounded-xl text-sm ${correct ? "bg-success/10 text-success-foreground" : "bg-destructive/10"}`}>
            <div className="flex items-center gap-2 font-semibold mb-1">
              {correct ? <><Check className="w-4 h-4 text-success" /> <span className="text-success">Correct!</span></> : <><X className="w-4 h-4 text-destructive" /> <span className="text-destructive">Not quite — answer was {p.answer}</span></>}
            </div>
            <p className="text-foreground/80"><strong>Rule:</strong> {p.rule}</p>
            <Button onClick={next} className="mt-3 bg-gradient-hero">Next puzzle →</Button>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <Button variant="ghost" size="sm" onClick={reset}><RefreshCw className="w-4 h-4 mr-1" />Reset</Button>
      </div>
    </div>
  );
}
