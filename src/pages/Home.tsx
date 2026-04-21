import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FlaskConical, Trophy, BookOpen, GraduationCap, Brain, Quote } from "lucide-react";
import heroImg from "@/assets/hero-ai.jpg";
import { pillars, classes } from "@/data/curriculum";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container pt-12 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> CBSE 2026-27 · Computational Thinking & AI
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] mb-5">
              Build <span className="gradient-text">AI-Readiness</span> from Class 3 to Class 8
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              An interactive companion to the CBSE Curriculum Framework — lessons, hands-on simulations, quizzes, and teacher resources rooted in the philosophy <em>Think First, Tool Second</em>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-hero hover:opacity-95 shadow-[var(--shadow-elegant)]">
                <Link to="/classes">Explore the Curriculum <ArrowRight className="ml-1 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/simulations">Try a Simulation</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { n: "6", l: "Grades" },
                { n: "10", l: "Workshops" },
                { n: "4+", l: "Simulations" },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-display font-bold gradient-text">{s.n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute -inset-8 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
            <img src={heroImg} alt="Children exploring AI and computational thinking" width={1536} height={1024} className="relative rounded-3xl shadow-[var(--shadow-elegant)] border border-border/50" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">The Four Pillars of Computational Thinking</h2>
          <p className="text-muted-foreground">Skills students already use — we just give them a name.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div
              key={p.id}
              className="card-elevated p-6 group animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-[var(--shadow-elegant)] group-hover:scale-110 transition-transform")}
                style={{ backgroundColor: `hsl(var(--${p.color}))` }}
              >
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
              <p className="text-xs text-foreground/80 italic border-l-2 pl-3" style={{ borderColor: `hsl(var(--${p.color}))` }}>
                {p.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Class quick links */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Grade-by-Grade Journey</h2>
            <p className="text-muted-foreground">From unplugged storytelling in Class 3 to full AI projects in Class 8.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/classes">View all <ArrowRight className="ml-1 w-4 h-4" /></Link></Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((c, i) => (
            <Link
              to={`/classes/${c.slug}`}
              key={c.slug}
              className="card-elevated p-6 group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: `hsl(${c.color})` }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-[var(--shadow-elegant)]"
                style={{ backgroundColor: `hsl(${c.color})` }}
              >
                <c.icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Class {c.grade}</div>
              <h3 className="font-display font-bold text-lg mb-1.5">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.tagline}</p>
              <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Open chapter <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature blocks */}
      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { to: "/simulations", icon: FlaskConical, title: "Hands-on Simulations", body: "Build flowcharts, spot bias, and walk through the AI project lifecycle.", color: "from-primary to-primary-glow" },
            { to: "/quizzes", icon: Trophy, title: "Track Your Progress", body: "Quizzes per class with instant feedback and saved scores.", color: "from-secondary to-primary" },
            { to: "/workshop", icon: BookOpen, title: "10-Hour Teacher Workshop", body: "A complete train-the-trainer manual with rubrics and roadmaps.", color: "from-accent to-secondary" },
          ].map((f, i) => (
            <Link key={f.to} to={f.to} className="card-elevated p-7 group animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 text-white", f.color)}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.body}</p>
              <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="container pb-20">
        <div className="card-elevated p-8 md:p-12 text-center bg-gradient-card relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-hero opacity-10 blur-3xl rounded-full" />
          <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-display font-semibold max-w-3xl mx-auto leading-snug">
            We are not teaching machines first. We are teaching students how to <span className="gradient-text">think clearly</span>, solve problems systematically, and understand technology responsibly.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">— The "Think First, Tool Second" Philosophy</p>
        </div>
      </section>
    </div>
  );
}
