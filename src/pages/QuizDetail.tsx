import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { quizzes } from "@/data/quizzes";
import { classes } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X, Trophy, RefreshCw } from "lucide-react";
import { recordQuizScore } from "@/lib/progress";

export default function QuizDetail() {
  const { slug } = useParams();
  const chapter = classes.find(c => c.slug === slug);
  const questions = (slug && quizzes[slug]) || [];
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  if (!chapter || questions.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
        <Button asChild><Link to="/quizzes">Back to quizzes</Link></Button>
      </div>
    );
  }

  const q = questions[idx];
  const picked = picks[idx];
  const correct = picked === q.answer;
  const isLast = idx === questions.length - 1;

  const next = () => {
    if (isLast) {
      const score = questions.reduce((acc, qq, i) => acc + (picks[i] === qq.answer ? 1 : 0), 0);
      recordQuizScore(slug!, score, questions.length);
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
  };
  const restart = () => { setIdx(0); setPicks({}); setDone(false); };

  if (done) {
    const score = questions.reduce((acc, qq, i) => acc + (picks[i] === qq.answer ? 1 : 0), 0);
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="container py-12 max-w-xl">
        <div className="card-elevated p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center shadow-[var(--shadow-elegant)]">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Quiz complete!</h1>
          <p className="text-muted-foreground mb-6">Class {chapter.grade}: {chapter.title}</p>
          <div className="text-5xl font-display font-bold gradient-text mb-2">{score}/{questions.length}</div>
          <p className="text-sm text-muted-foreground mb-6">{pct}% — {pct === 100 ? "Perfect! 🎉" : pct >= 70 ? "Great job!" : "Review and try again."}</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button onClick={restart} variant="outline"><RefreshCw className="w-4 h-4 mr-1" />Try again</Button>
            <Button asChild className="bg-gradient-hero"><Link to="/quizzes">All quizzes</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl">
      <Link to="/quizzes" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All quizzes</Link>
      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Class {chapter.grade} · Question {idx + 1} of {questions.length}</div>
      <h1 className="text-2xl md:text-3xl font-display font-bold mb-6">{chapter.title}</h1>

      <div className="h-2 rounded-full bg-muted mb-6 overflow-hidden">
        <div className="h-full bg-gradient-hero transition-all" style={{ width: `${((idx + (picked !== undefined ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className="card-elevated p-6">
        <h2 className="font-display font-semibold text-lg mb-5">{q.q}</h2>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === picked;
            const colorClass = picked !== undefined
              ? isAnswer ? "bg-success/10 border-success text-foreground"
                : isPicked ? "bg-destructive/10 border-destructive text-foreground"
                : "border-border opacity-50"
              : "border-border hover:border-primary hover:bg-primary/5";
            return (
              <button
                key={i}
                disabled={picked !== undefined}
                onClick={() => setPicks(p => ({ ...p, [idx]: i }))}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${colorClass}`}
              >
                <span className="text-sm font-medium">{opt}</span>
                {picked !== undefined && isAnswer && <Check className="w-5 h-5 text-success shrink-0" />}
                {picked !== undefined && isPicked && !isAnswer && <X className="w-5 h-5 text-destructive shrink-0" />}
              </button>
            );
          })}
        </div>

        {picked !== undefined && (
          <div className={`mt-5 p-4 rounded-xl text-sm ${correct ? "bg-success/10" : "bg-destructive/10"}`}>
            <div className="font-semibold mb-1">{correct ? "✓ Correct" : "✗ Not quite"}</div>
            <p className="text-foreground/80">{q.explain}</p>
          </div>
        )}

        <div className="flex justify-end mt-5">
          <Button onClick={next} disabled={picked === undefined} className="bg-gradient-hero">
            {isLast ? "Finish" : "Next question →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
