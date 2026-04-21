import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X, RefreshCw } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Node = { id: string; label: string; children: Node[] };

const goals = ["Plan a Class Picnic", "Organise a Science Fair", "Build a School Garden", "Run a Charity Drive"];

const seed = (label: string): Node => ({ id: crypto.randomUUID(), label, children: [] });

export default function DecomposeSim() {
  const [goal, setGoal] = useState(goals[0]);
  const [tree, setTree] = useState<Node>(seed(goals[0]));
  const [draft, setDraft] = useState<Record<string, string>>({});

  const reset = (g: string) => { setGoal(g); setTree(seed(g)); setDraft({}); };

  const add = (parentId: string) => {
    const text = (draft[parentId] || "").trim();
    if (!text) return;
    const insert = (n: Node): Node => n.id === parentId
      ? { ...n, children: [...n.children, seed(text)] }
      : { ...n, children: n.children.map(insert) };
    setTree(insert(tree));
    setDraft({ ...draft, [parentId]: "" });
  };

  const remove = (id: string) => {
    const strip = (n: Node): Node => ({ ...n, children: n.children.filter(c => c.id !== id).map(strip) });
    setTree(strip(tree));
  };

  const count = (n: Node): number => 1 + n.children.reduce((s, c) => s + count(c), 0);

  const render = (n: Node, depth = 0) => (
    <div key={n.id} className="mt-2" style={{ marginLeft: depth * 20 }}>
      <div className="flex items-center gap-2 group">
        <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${depth === 0 ? "bg-primary text-primary-foreground" : depth === 1 ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}>
          {n.label}
        </div>
        {depth > 0 && (
          <button onClick={() => remove(n.id)} className="opacity-0 group-hover:opacity-100 text-destructive p-1"><X className="w-3.5 h-3.5" /></button>
        )}
      </div>
      <div className="flex gap-2 mt-2 ml-1">
        <input
          value={draft[n.id] || ""}
          onChange={e => setDraft({ ...draft, [n.id]: e.target.value })}
          onKeyDown={e => e.key === "Enter" && add(n.id)}
          placeholder="Add a sub-task…"
          className="text-xs px-2 py-1 rounded border border-border bg-background w-48"
        />
        <button onClick={() => add(n.id)} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1"><Plus className="w-3 h-3" />Add</button>
      </div>
      {n.children.map(c => render(c, depth + 1))}
    </div>
  );

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Decomposition Builder</h1>
        <SimHelp
          title="Decomposition Builder"
          goal="Practise breaking a big, scary goal into small tasks anyone (or any computer) can actually do."
          steps={[
            "Pick a goal from the chips at the top (e.g. 'Plan a Class Picnic').",
            "In the input under the main goal, type a major sub-task and press Enter (or click Add).",
            "Each sub-task gets its own input — break it down further into smaller steps.",
            "Hover any sub-task and click ✕ to remove it. Click Reset to start over."
          ]}
          examples={[
            "Goal: Plan a Class Picnic",
            "  → Choose date  → Send invites  → Plan food  → Plan games",
            "Plan food → Make menu → Collect money → Buy supplies → Pack baskets"
          ]}
          tip="A good rule: keep splitting until each leaf task can be done in under 15 minutes by one person."
        />
      </div>
      <p className="text-muted-foreground mb-6">Pick a goal, then break it down into smaller tasks and sub-tasks.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {goals.map(g => (
          <button key={g} onClick={() => reset(g)} className={`text-xs px-3 py-1.5 rounded-full font-semibold ${goal === g ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{g}</button>
        ))}
        <button onClick={() => reset(goal)} className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/70 inline-flex items-center gap-1"><RefreshCw className="w-3 h-3" />Reset</button>
      </div>

      <div className="card-elevated p-6">
        {render(tree)}
      </div>

      <div className="card-elevated p-5 mt-6 bg-primary/5">
        <h3 className="font-semibold mb-1">📊 Your tree has {count(tree)} nodes</h3>
        <p className="text-sm text-muted-foreground">Decomposition turns a vague goal into a checklist a team — or a computer — can execute.</p>
      </div>
    </div>
  );
}
