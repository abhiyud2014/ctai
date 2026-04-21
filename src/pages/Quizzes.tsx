import { Link } from "react-router-dom";
import { classes } from "@/data/curriculum";
import { quizzes } from "@/data/quizzes";
import { Trophy, ArrowRight, RotateCcw } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/components/ui/button";
import { resetProgress } from "@/lib/progress";

export default function Quizzes() {
  const progress = useProgress();
  const total = Object.values(quizzes).reduce((acc, q) => acc + q.length, 0);
  const earned = Object.values(progress.quizScores).reduce((a, s) => a + s.score, 0);
  const pct = total ? Math.round((earned / total) * 100) : 0;

  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> Quizzes & Progress</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Test what you've learned</h1>
        <p className="text-muted-foreground">A short quiz per class. Your best scores are saved on this device.</p>
      </header>

      <div className="card-elevated p-6 mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex flex-wrap items-center gap-6 justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Overall progress</div>
            <div className="text-3xl font-display font-bold gradient-text">{earned} / {total} <span className="text-base text-muted-foreground font-normal">points</span></div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-hero transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="text-xs text-right mt-1 text-muted-foreground">{pct}% complete</div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { if (confirm("Reset all progress?")) resetProgress(); }}>
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map(c => {
          const qs = quizzes[c.slug] || [];
          const score = progress.quizScores[c.slug];
          return (
            <Link to={`/quizzes/${c.slug}`} key={c.slug} className="card-elevated p-6 group">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Class {c.grade}</div>
              <h2 className="font-display font-bold text-lg mt-1 mb-1">{c.title}</h2>
              <p className="text-xs text-muted-foreground mb-4">{qs.length} questions</p>
              {score && (
                <div className="text-sm mb-3">Best: <strong className="text-success">{score.score}/{score.total}</strong></div>
              )}
              <div className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">{score ? "Try again" : "Start quiz"} <ArrowRight className="w-4 h-4" /></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
