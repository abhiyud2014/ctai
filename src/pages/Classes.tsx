import { Link } from "react-router-dom";
import { classes } from "@/data/curriculum";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

export default function Classes() {
  const progress = useProgress();
  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Part II · Grade-Specific Implementation</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Classes 3 – 8</h1>
        <p className="text-muted-foreground">A guided journey from unplugged storytelling to real AI projects. Each chapter includes objectives, classroom activities, and an "Author's Insight" connecting school concepts to enterprise AI.</p>
      </header>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {classes.map(c => {
          const visited = progress.visitedChapters.includes(c.slug);
          const quiz = progress.quizScores[c.slug];
          return (
            <Link to={`/classes/${c.slug}`} key={c.slug} className="card-elevated p-6 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: `hsl(${c.color})` }} />
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[var(--shadow-elegant)]" style={{ backgroundColor: `hsl(${c.color})` }}>
                  <c.icon className="w-6 h-6" />
                </div>
                {visited && <span className="text-xs inline-flex items-center gap-1 text-success"><CheckCircle2 className="w-4 h-4" /> Visited</span>}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Class {c.grade}</div>
              <h2 className="font-display font-bold text-xl mt-1 mb-2">{c.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{c.tagline}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Open <ArrowRight className="w-4 h-4" /></span>
                {quiz && <span className="text-xs text-muted-foreground">Quiz: {quiz.score}/{quiz.total}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
