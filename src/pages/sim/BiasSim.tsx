import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import SimHelp from "@/components/SimHelp";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

// Simple "model" that classifies a fruit by colour, weighted by training data balance.
type Fruit = { name: string; emoji: string; color: "red" | "green" | "yellow" };
const testFruits: Fruit[] = [
  { name: "Red Apple", emoji: "🍎", color: "red" },
  { name: "Green Apple", emoji: "🍏", color: "green" },
  { name: "Yellow Banana", emoji: "🍌", color: "yellow" },
  { name: "Green Banana", emoji: "🥒", color: "green" }, // pretend green banana
];

export default function BiasSim() {
  const [redApples, setRedApples] = useState(10);
  const [greenApples, setGreenApples] = useState(0);
  const [yellowBananas, setYellowBananas] = useState(10);
  const [greenBananas, setGreenBananas] = useState(0);
  const [tested, setTested] = useState<{ fruit: Fruit; predicted: string; confidence: number }[]>([]);

  const data = useMemo(() => ([
    { name: "Apple", red: redApples, green: greenApples, yellow: 0 },
    { name: "Banana", red: 0, green: greenBananas, yellow: yellowBananas },
  ]), [redApples, greenApples, yellowBananas, greenBananas]);

  const classify = (fruit: Fruit) => {
    // Score each class by how many training samples match the test colour.
    const appleScore = fruit.color === "red" ? redApples : fruit.color === "green" ? greenApples : 0;
    const bananaScore = fruit.color === "yellow" ? yellowBananas : fruit.color === "green" ? greenBananas : 0;
    const total = appleScore + bananaScore;
    if (total === 0) return { label: "Unsure", confidence: 0 };
    const predicted = appleScore >= bananaScore ? "Apple" : "Banana";
    const confidence = Math.round((Math.max(appleScore, bananaScore) / total) * 100);
    return { label: predicted, confidence };
  };

  const test = (fruit: Fruit) => {
    const { label, confidence } = classify(fruit);
    setTested(t => [{ fruit, predicted: label, confidence }, ...t].slice(0, 6));
  };

  const reset = () => {
    setRedApples(10); setGreenApples(0); setYellowBananas(10); setGreenBananas(0); setTested([]);
  };

  const isBiased = (greenApples === 0 && redApples > 0) || (greenBananas === 0 && yellowBananas > 0);

  return (
    <div className="container py-12 max-w-4xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Biased Dataset Lab</h1>
        <SimHelp
          title="Biased Dataset Lab"
          goal="See how unbalanced training data leads an AI to make unfair or wrong predictions."
          steps={[
            "Use the sliders to choose how many red apples, green apples, yellow bananas, and green bananas the AI learns from.",
            "Click 'Test the AI' to run all 4 mystery fruits through the model.",
            "Read each prediction — is it correct? How confident is it?",
            "Try an extreme setup (e.g. 10 red apples, 0 green apples) and test again to see bias appear."
          ]}
          examples={[
            "Train on 10 red apples + 0 green apples → AI calls a 🍏 green apple a 'banana'.",
            "Balanced training (5 of each colour) → predictions get much fairer."
          ]}
          tip="Real-world example: face-recognition systems trained mostly on light-skinned faces perform poorly on darker skin. Same bug — bigger consequences."
        />
      </div>
      <p className="text-muted-foreground mb-8">Adjust the training data, then test the AI on different fruits. Watch what happens when colours are unbalanced.</p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Training data */}
        <div className="card-elevated p-6">
          <h2 className="font-display font-bold text-lg mb-4">1. Training Data</h2>
          {[
            { label: "🍎 Red Apples", val: redApples, set: setRedApples },
            { label: "🍏 Green Apples", val: greenApples, set: setGreenApples },
            { label: "🍌 Yellow Bananas", val: yellowBananas, set: setYellowBananas },
            { label: "🥒 Green Bananas", val: greenBananas, set: setGreenBananas },
          ].map(s => (
            <div key={s.label} className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{s.label}</span>
                <span className="font-mono">{s.val}</span>
              </div>
              <input type="range" min={0} max={20} value={s.val} onChange={e => s.set(parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
          ))}

          <div className="h-40 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="red" stackId="a" fill="hsl(0 80% 60%)" />
                <Bar dataKey="green" stackId="a" fill="hsl(120 60% 45%)" />
                <Bar dataKey="yellow" stackId="a" fill="hsl(48 95% 55%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {isBiased && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-sm flex gap-2 items-start">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <span><strong>Biased dataset detected:</strong> at least one colour is missing from a class. The model will likely fail on edge cases.</span>
            </div>
          )}
        </div>

        {/* Testing */}
        <div className="card-elevated p-6">
          <h2 className="font-display font-bold text-lg mb-4">2. Test the Model</h2>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {testFruits.map(f => (
              <button key={f.name} onClick={() => test(f)} className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all">
                <div className="text-3xl mb-1">{f.emoji}</div>
                <div className="text-xs font-semibold">{f.name}</div>
              </button>
            ))}
          </div>
          <h3 className="font-semibold text-sm mb-2">Predictions:</h3>
          {tested.length === 0 ? (
            <p className="text-sm text-muted-foreground">Click a fruit to see what the AI predicts.</p>
          ) : (
            <div className="space-y-2">
              {tested.map((t, i) => {
                const truth = t.fruit.name.includes("Apple") ? "Apple" : "Banana";
                const correct = t.predicted === truth;
                return (
                  <div key={i} className={`p-3 rounded-lg flex items-center justify-between text-sm ${correct ? "bg-success/10" : "bg-destructive/10"}`}>
                    <span><span className="text-xl mr-2">{t.fruit.emoji}</span><strong>{t.fruit.name}</strong></span>
                    <span className={`font-mono font-semibold ${correct ? "text-success" : "text-destructive"}`}>→ {t.predicted} {t.confidence > 0 ? `(${t.confidence}%)` : ""}</span>
                  </div>
                );
              })}
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={reset} className="mt-4"><RefreshCw className="w-4 h-4 mr-1" />Reset</Button>
        </div>
      </div>

      <div className="card-elevated p-5 mt-6 bg-primary/5">
        <h3 className="font-semibold mb-1">💡 The Lesson</h3>
        <p className="text-sm text-muted-foreground">The AI isn't "stupid" — it just learns from what you give it. Train only on red apples and yellow bananas, then show it a green apple, and it might confidently say "Banana". <strong>Always ask: who is left out of this data?</strong></p>
      </div>
    </div>
  );
}
