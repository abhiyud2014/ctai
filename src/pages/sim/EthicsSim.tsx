import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Scale } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Choice = { label: string; consequence: string; score: number };
type Card = { scenario: string; choices: Choice[] };

const cards: Card[] = [
  {
    scenario: "Your school wants to use facial recognition to mark attendance. The vendor says it's 95% accurate — but only on light skin.",
    choices: [
      { label: "Deploy it now — 95% is great!", consequence: "Students with darker skin are wrongly marked absent. Trust collapses.", score: 0 },
      { label: "Pause and demand fairer training data", consequence: "Roll-out is delayed but final system works for everyone. Right call.", score: 3 },
      { label: "Keep manual attendance as backup", consequence: "Acceptable middle ground, but doesn't fix the underlying bias.", score: 1 },
    ],
  },
  {
    scenario: "An AI tutor records every student's voice to improve. Parents weren't told.",
    choices: [
      { label: "Continue silently — better product wins", consequence: "Privacy violation. Parents could sue, trust destroyed.", score: 0 },
      { label: "Get explicit consent + opt-out option", consequence: "Slower onboarding but ethically sound. Long-term trust.", score: 3 },
      { label: "Anonymise the audio first", consequence: "Better, but consent is still required by law in most regions.", score: 2 },
    ],
  },
  {
    scenario: "Your essay-grading AI gives lower marks to non-native English writers.",
    choices: [
      { label: "Ship it — teachers can override", consequence: "Bias gets baked into grades; few teachers actually override.", score: 0 },
      { label: "Retrain on diverse writing styles", consequence: "Fairer model. Takes effort but the right path.", score: 3 },
      { label: "Add a disclaimer in the report", consequence: "Doesn't fix the harm. Performative ethics.", score: 1 },
    ],
  },
  {
    scenario: "A chatbot for kids occasionally produces inappropriate jokes.",
    choices: [
      { label: "Add filters but keep it live", consequence: "Filters miss edge cases. Risk to children.", score: 1 },
      { label: "Take it offline until robust safety tests pass", consequence: "Safety first. Right call for vulnerable users.", score: 3 },
      { label: "Let parents flag content", consequence: "Reactive, not preventive. Some harm already done.", score: 0 },
    ],
  },
  {
    scenario: "A loan-approval AI denies more loans in poorer postcodes.",
    choices: [
      { label: "Accept — the data is the data", consequence: "Reinforces existing inequality. Likely illegal.", score: 0 },
      { label: "Audit the features and remove postcode", consequence: "Reduces proxy discrimination. Good first step.", score: 3 },
      { label: "Let humans review every denial", consequence: "Slow but adds accountability.", score: 2 },
    ],
  },
];

export default function EthicsSim() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [seen, setSeen] = useState(0);

  const c = cards[idx];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setScore(score + c.choices[i].score);
    setSeen(seen + 1);
  };

  const next = () => {
    setPicked(null);
    setIdx((idx + 1) % cards.length);
  };

  const reset = () => { setIdx(0); setPicked(null); setScore(0); setSeen(0); };

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <div className="flex items-start gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 inline-flex items-center gap-2"><Scale className="w-8 h-8 text-primary" />Ethics Dilemma Cards</h1>
            <SimHelp
              title="Ethics Dilemma Cards"
              goal="Practise judging real AI trade-offs — accuracy vs fairness, speed vs consent, profit vs harm."
              steps={[
                "Read the scenario card carefully — note who is affected.",
                "Pick the option that feels most responsible (not always the easiest).",
                "Read the consequence revealed and your score for that choice.",
                "Click 'Next dilemma' to face a new scenario. Track your total score at the end."
              ]}
              examples={[
                "Facial-recognition attendance accurate only on light skin → Pause and demand fairer training data (3 pts).",
                "AI tutor records voices without telling parents → Get explicit consent + opt-out (3 pts)."
              ]}
              tip="There are rarely 'perfect' answers in ethics — but some choices clearly cause harm. Aim for the option that protects the most vulnerable users."
            />
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold gradient-text">{score} / {seen * 3}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Ethics points</div>
        </div>
      </div>

      <div className="card-elevated p-6">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Card {idx + 1} / {cards.length}</div>
        <p className="text-lg font-semibold mb-5">{c.scenario}</p>

        <div className="space-y-2">
          {c.choices.map((ch, i) => {
            const isPicked = picked === i;
            const show = picked !== null;
            const tone = show ? (ch.score >= 3 ? "bg-success/10 border-success" : ch.score >= 2 ? "bg-accent/10 border-accent" : "bg-destructive/10 border-destructive") : "bg-card border-border hover:border-primary";
            return (
              <button key={i} onClick={() => choose(i)} disabled={picked !== null} className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${tone} ${isPicked ? "ring-2 ring-primary" : ""}`}>
                <div className="font-semibold text-sm">{ch.label}</div>
                {show && (
                  <div className="text-xs text-muted-foreground mt-2">
                    <strong className="text-foreground">Consequence:</strong> {ch.consequence} <span className="font-mono">(+{ch.score} pts)</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <Button onClick={next} className="mt-5 w-full bg-gradient-hero">Next dilemma →</Button>
        )}
      </div>

      <div className="text-center mt-6">
        <Button variant="ghost" size="sm" onClick={reset}><RefreshCw className="w-4 h-4 mr-1" />Reset</Button>
      </div>
    </div>
  );
}
