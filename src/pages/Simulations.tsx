import { Link } from "react-router-dom";
import { FlaskConical, GitBranch, Sparkles, Brain, Layers, Boxes, Filter, MessageSquare, Cpu, Search, Scale } from "lucide-react";

const sims = [
  { to: "/simulations/flowchart", title: "Build a Flowchart", body: "Click through the morning routine with an 'Is it raining?' decision branch.", icon: GitBranch, color: "var(--grade-5)" },
  { to: "/simulations/pattern", title: "Pattern Detective", body: "Spot the next item in a sequence — train your pattern-recognition muscle.", icon: Sparkles, color: "var(--grade-3)" },
  { to: "/simulations/bias", title: "Biased Dataset Lab", body: "See how unbalanced training data breaks an image classifier.", icon: Brain, color: "var(--grade-7)" },
  { to: "/simulations/lifecycle", title: "AI Project Lifecycle", body: "Walk through Define → Collect → Train → Test → Reflect for a real project.", icon: Layers, color: "var(--grade-8)" },
  { to: "/simulations/decompose", title: "Decomposition Builder", body: "Break a big goal into bite-sized sub-tasks and visualise the tree.", icon: Boxes, color: "var(--grade-4)" },
  { to: "/simulations/abstraction", title: "Abstraction Sorter", body: "Decide which details matter and which to ignore for a given task.", icon: Filter, color: "var(--grade-5)" },
  { to: "/simulations/chatbot", title: "Mini Chatbot Builder", body: "Wire up keyword → response rules and chat with your own bot.", icon: MessageSquare, color: "var(--grade-6)" },
  { to: "/simulations/classifier", title: "Train a Classifier", body: "Label fruits by features and let a tiny rule-based AI predict the rest.", icon: Cpu, color: "var(--grade-7)" },
  { to: "/simulations/search", title: "Search Algorithm Race", body: "Linear vs binary search — feel the difference on a sorted list.", icon: Search, color: "var(--grade-6)" },
  { to: "/simulations/ethics", title: "Ethics Dilemma Cards", body: "Choose how to handle real AI ethics scenarios and see the consequences.", icon: Scale, color: "var(--grade-8)" },
];

export default function Simulations() {
  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5" /> Hands-on Simulations</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Learn by doing</h1>
        <p className="text-muted-foreground">Interactive demos that turn abstract CT and AI concepts into something you can click, drag, and play with.</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sims.map(s => (
          <Link key={s.to} to={s.to} className="card-elevated p-6 group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[var(--shadow-elegant)] mb-4" style={{ backgroundColor: `hsl(${s.color})` }}>
              <s.icon className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl mb-2">{s.title}</h2>
            <p className="text-sm text-muted-foreground">{s.body}</p>
            <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">Launch →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
