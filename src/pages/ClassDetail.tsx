import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { classes } from "@/data/curriculum";
import { quizzes } from "@/data/quizzes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Target, CheckCircle2, Lightbulb, Wrench, Trophy } from "lucide-react";
import { markChapterVisited, toggleActivity } from "@/lib/progress";
import { useProgress } from "@/hooks/useProgress";

export default function ClassDetail() {
  const { slug } = useParams();
  const chapter = classes.find(c => c.slug === slug);
  const progress = useProgress();

  useEffect(() => {
    if (chapter) markChapterVisited(chapter.slug);
  }, [chapter]);

  const idx = useMemo(() => classes.findIndex(c => c.slug === slug), [slug]);
  const prev = idx > 0 ? classes[idx - 1] : null;
  const next = idx < classes.length - 1 ? classes[idx + 1] : null;

  if (!chapter) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Chapter not found</h1>
        <Button asChild><Link to="/classes">Back to all classes</Link></Button>
      </div>
    );
  }

  const hasQuiz = quizzes[chapter.slug]?.length > 0;
  const quizScore = progress.quizScores[chapter.slug];

  return (
    <div>
      {/* Header band */}
      <div className="relative overflow-hidden border-b border-border/60" style={{ background: `linear-gradient(135deg, hsl(${chapter.color} / 0.15), transparent)` }}>
        <div className="container py-12">
          <Link to="/classes" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All classes</Link>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-[var(--shadow-elegant)] shrink-0" style={{ backgroundColor: `hsl(${chapter.color})` }}>
              <chapter.icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Class {chapter.grade}</div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mt-1 mb-2">{chapter.title}</h1>
              <p className="text-muted-foreground max-w-2xl">{chapter.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10 grid lg:grid-cols-[1fr_300px] gap-10">
        <div className="space-y-10">
          {/* Objectives */}
          <section className="card-elevated p-6">
            <h2 className="font-display font-bold text-lg mb-2 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Core Learning Objectives</h2>
            <p className="text-muted-foreground">{chapter.objectives}</p>
          </section>

          {/* Tool deep-dive */}
          {chapter.toolDeepDive && (
            <section className="card-elevated p-6">
              <h2 className="font-display font-bold text-lg mb-1 flex items-center gap-2"><Wrench className="w-5 h-5 text-primary" /> Tool Deep-Dive: {chapter.toolDeepDive.name}</h2>
              <p className="text-muted-foreground mb-5">{chapter.toolDeepDive.description}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {chapter.toolDeepDive.sections.map(s => (
                  <div key={s.heading} className="rounded-xl bg-muted/50 p-4">
                    <h4 className="font-semibold text-sm mb-2">{s.heading}</h4>
                    <ul className="text-xs text-muted-foreground space-y-1.5">
                      {s.items.map((it, i) => <li key={i} className="flex gap-1.5"><span className="text-primary">•</span>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities */}
          <section>
            <h2 className="font-display font-bold text-2xl mb-4">Classroom Activities</h2>
            <div className="space-y-5">
              {chapter.activities.map((a, i) => {
                const id = `${chapter.slug}-act-${i}`;
                const done = progress.completedActivities.includes(id);
                return (
                  <div key={id} className="card-elevated p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">Activity {i + 1}</div>
                        <h3 className="font-display font-bold text-xl">{a.title}</h3>
                      </div>
                      <button
                        onClick={() => toggleActivity(id)}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 transition-colors ${done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />{done ? "Completed" : "Mark complete"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{a.focus}</span>
                      <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground inline-flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4"><strong className="text-foreground">Objective:</strong> {a.objective}</p>
                    <ol className="space-y-2">
                      {a.steps.map((s, k) => (
                        <li key={k} className="flex gap-3 text-sm">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">{k + 1}</span>
                          <span className="text-foreground/90">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Author insight */}
          {chapter.authorInsight && (
            <section className="card-elevated p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h2 className="font-display font-bold text-lg mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-accent" /> Author's Insight</h2>
              <p className="text-foreground/90 italic">{chapter.authorInsight}</p>
            </section>
          )}

          {/* Nav */}
          <div className="flex justify-between gap-3 pt-4">
            {prev ? (
              <Button asChild variant="outline"><Link to={`/classes/${prev.slug}`}><ArrowLeft className="w-4 h-4 mr-1" />Class {prev.grade}</Link></Button>
            ) : <div />}
            {next && (
              <Button asChild className="bg-gradient-hero"><Link to={`/classes/${next.slug}`}>Class {next.grade}<ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-20 self-start">
          {hasQuiz && (
            <div className="card-elevated p-5">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold">Test Yourself</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Take the Class {chapter.grade} quiz to lock in concepts.</p>
              {quizScore && <div className="text-xs text-muted-foreground mb-3">Best: <strong className="text-foreground">{quizScore.score}/{quizScore.total}</strong></div>}
              <Button asChild className="w-full bg-gradient-hero"><Link to={`/quizzes/${chapter.slug}`}>Start quiz</Link></Button>
            </div>
          )}
          <div className="card-elevated p-5">
            <h3 className="font-display font-bold mb-2">Try a Simulation</h3>
            <p className="text-sm text-muted-foreground mb-3">Hands-on demos that match this chapter.</p>
            <Button asChild variant="outline" className="w-full"><Link to="/simulations">Open simulations</Link></Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
