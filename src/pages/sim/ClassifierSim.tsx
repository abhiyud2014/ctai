import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Check, X } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Item = { name: string; round: boolean; red: boolean; small: boolean; label: "Apple" | "Banana" | "Grape" };

const dataset: Item[] = [
  { name: "🍎 Apple A", round: true, red: true, small: false, label: "Apple" },
  { name: "🍎 Apple B", round: true, red: true, small: false, label: "Apple" },
  { name: "🍌 Banana A", round: false, red: false, small: false, label: "Banana" },
  { name: "🍌 Banana B", round: false, red: false, small: false, label: "Banana" },
  { name: "🍇 Grape A", round: true, red: false, small: true, label: "Grape" },
  { name: "🍇 Grape B", round: true, red: true, small: true, label: "Grape" },
];

const tests: Item[] = [
  { name: "🍎 Mystery 1", round: true, red: true, small: false, label: "Apple" },
  { name: "🍌 Mystery 2", round: false, red: false, small: false, label: "Banana" },
  { name: "🍇 Mystery 3", round: true, red: false, small: true, label: "Grape" },
  { name: "🍎 Mystery 4", round: true, red: true, small: false, label: "Apple" },
];

function classify(features: { round: boolean; red: boolean; small: boolean }, training: Item[]): string {
  const scores: Record<string, number> = {};
  training.forEach(t => {
    let s = 0;
    if (t.round === features.round) s++;
    if (t.red === features.red) s++;
    if (t.small === features.small) s++;
    scores[t.label] = (scores[t.label] || 0) + s;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function ClassifierSim() {
  const [trained, setTrained] = useState<Item[]>([]);
  const [step, setStep] = useState<"train" | "test">("train");

  const predictions = useMemo(() =>
    tests.map(t => ({ ...t, predicted: classify(t, trained) })),
    [trained]
  );

  const accuracy = predictions.length
    ? Math.round((predictions.filter(p => p.predicted === p.label).length / predictions.length) * 100)
    : 0;

  const toggle = (i: Item) => {
    setTrained(trained.find(t => t.name === i.name) ? trained.filter(t => t.name !== i.name) : [...trained, i]);
  };

  const reset = () => { setTrained([]); setStep("train"); };

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Train a Classifier</h1>
        <SimHelp
          title="Train a Classifier"
          goal="See how the number and variety of training examples affect an AI's accuracy on new, unseen data."
          steps={[
            "Tick the boxes next to fruits to include them as training examples.",
            "Try training with just 1 example per class — note the predictions.",
            "Now tick more examples (especially varied ones) and watch accuracy change.",
            "Compare AI predictions vs the true labels at the bottom."
          ]}
          examples={[
            "Train with 1 apple + 1 banana + 1 grape → predictions may flip on edge cases.",
            "Train with 2 of each, including a red grape → AI handles the tricky 'red round small' case better."
          ]}
          tip="More data ≠ always better. Diverse, representative data beats lots of similar-looking data every time."
        />
      </div>
      <p className="text-muted-foreground mb-6">Pick training examples → see how well the AI labels new fruits using their features.</p>

      <div className="flex gap-2 mb-5">
        <button onClick={() => setStep("train")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${step === "train" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1. Train</button>
        <button onClick={() => setStep("test")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${step === "test" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} disabled={trained.length === 0}>2. Test</button>
      </div>

      {step === "train" && (
        <div className="card-elevated p-6">
          <h2 className="font-display font-bold mb-3">Pick training examples ({trained.length} selected)</h2>
          <p className="text-sm text-muted-foreground mb-4">More variety = better predictions. Try training with only apples to see bias!</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {dataset.map(i => {
              const on = !!trained.find(t => t.name === i.name);
              return (
                <button key={i.name} onClick={() => toggle(i)} className={`text-left p-3 rounded-lg border-2 text-sm transition-colors ${on ? "bg-primary/10 border-primary" : "bg-card border-border hover:border-primary/40"}`}>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {i.round ? "round" : "long"} · {i.red ? "red" : "not red"} · {i.small ? "small" : "big"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === "test" && (
        <div className="card-elevated p-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display font-bold">Test predictions</h2>
            <div className="text-right">
              <div className="text-2xl font-display font-bold gradient-text">{accuracy}%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</div>
            </div>
          </div>
          <div className="space-y-2">
            {predictions.map(p => {
              const ok = p.predicted === p.label;
              return (
                <div key={p.name} className={`flex items-center justify-between p-3 rounded-lg ${ok ? "bg-success/10" : "bg-destructive/10"}`}>
                  <div>
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">Actual: {p.label}</div>
                  </div>
                  <div className="text-sm font-semibold inline-flex items-center gap-1">
                    {ok ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                    Predicted: {p.predicted}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <Button variant="ghost" size="sm" onClick={reset}><RefreshCw className="w-4 h-4 mr-1" />Reset</Button>
      </div>
    </div>
  );
}
