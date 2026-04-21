import { ethicsTopics } from "@/data/curriculum";
import { Shield, AlertTriangle, Eye, Sparkles } from "lucide-react";

const icons = [Eye, AlertTriangle, Sparkles];

export default function Ethics() {
  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Part IV</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">AI Ethics, Safety & Generative AI</h1>
        <p className="text-muted-foreground">As we integrate AI in classrooms, we must prioritise the human element. Regular ethics discussion teaches students to verify, detect bias, and avoid cognitive delegation.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">
        {ethicsTopics.map((t, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <div key={t.title} className="card-elevated p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center shadow-[var(--shadow-elegant)] mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-lg mb-3">{t.title}</h2>
              <ul className="space-y-2.5">
                {t.points.map((p, k) => (
                  <li key={k} className="text-sm text-foreground/85 flex gap-2">
                    <span className="text-primary mt-1">•</span><span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-10 card-elevated p-6 bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
        <h2 className="font-display font-bold text-xl mb-2">The Three Golden Rules for Students</h2>
        <ol className="space-y-2 text-foreground/90">
          <li><strong>1. Verify.</strong> AI hallucinates. Cross-check facts with reliable sources.</li>
          <li><strong>2. Disclose.</strong> If AI helped, say so — academic integrity matters.</li>
          <li><strong>3. Don't outsource thinking.</strong> Use AI to enhance creativity, not replace the struggle of learning.</li>
        </ol>
      </div>
    </div>
  );
}
