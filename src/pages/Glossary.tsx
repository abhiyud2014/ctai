import { useMemo, useState } from "react";
import { glossary } from "@/data/curriculum";
import { Search, Library } from "lucide-react";

export default function Glossary() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return glossary;
    return glossary.filter(g => g.term.toLowerCase().includes(s) || g.definition.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-1.5"><Library className="w-3.5 h-3.5" /> Part V · Resources</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Glossary</h1>
        <p className="text-muted-foreground">Plain-language definitions of every term used in this curriculum.</p>
      </header>

      <div className="relative max-w-md mb-8">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search terms…"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No matching terms.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map(g => (
            <div key={g.term} className="card-elevated p-5">
              <h3 className="font-display font-bold text-base mb-1.5 text-primary">{g.term}</h3>
              <p className="text-sm text-muted-foreground">{g.definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
