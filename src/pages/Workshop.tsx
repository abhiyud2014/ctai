import { workshopModules } from "@/data/curriculum";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Users, Target, Lightbulb } from "lucide-react";

export default function Workshop() {
  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Part III · Train the Trainer</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">10-Hour Teacher Workshop</h1>
        <p className="text-muted-foreground">Ten focused modules to take a teacher from anxious to confident — in two days, or stretched across weeks.</p>
      </header>

      <Accordion type="multiple" className="space-y-3">
        {workshopModules.map(m => (
          <AccordionItem key={m.number} value={`m-${m.number}`} className="card-elevated px-5 border-0">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-4 text-left">
                <div className="w-11 h-11 rounded-xl bg-gradient-hero text-white font-display font-bold flex items-center justify-center shadow-[var(--shadow-elegant)] shrink-0">
                  {m.number}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Module {m.number}</div>
                  <h3 className="font-display font-bold text-base md:text-lg">{m.title}</h3>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-primary/5 p-4">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-1.5 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />Goal</h4>
                  <p className="text-sm">{m.goal}</p>
                </div>
                <div className="rounded-xl bg-secondary/5 p-4">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-secondary mb-1.5 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" />Strategy</h4>
                  <p className="text-sm">{m.strategy}</p>
                </div>
              </div>
              <div className="rounded-xl border-l-4 border-accent bg-accent/5 p-4">
                <h4 className="font-display font-bold text-base mb-2">🎯 Workshop Activity: {m.activity.name}</h4>
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-card border border-border inline-flex items-center gap-1"><Clock className="w-3 h-3" />{m.activity.time}</span>
                  <span className="px-2.5 py-1 rounded-full bg-card border border-border inline-flex items-center gap-1"><Users className="w-3 h-3" />{m.activity.mode}</span>
                </div>
                <p className="text-sm text-foreground/90">{m.activity.task}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Roadmap */}
      <div className="mt-12 card-elevated p-6">
        <h2 className="font-display font-bold text-2xl mb-1">30 · 60 · 90 Day Roadmap</h2>
        <p className="text-sm text-muted-foreground mb-6">Start small. Don't boil the ocean.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { days: "Day 1–30", focus: "Awareness & Basics", actions: "Introduce CT in Math/EVS. Run 2 unplugged activities. Set up resource corner.", color: "var(--grade-3)" },
            { days: "Day 31–60", focus: "Integration & Tools", actions: "Introduce Scratch (Class 6). Start first interdisciplinary project. Conduct first AI ethics discussion.", color: "var(--grade-6)" },
            { days: "Day 61–90", focus: "Assessment & Review", actions: "Use Master Rubric for project grading. Review student progress. Plan next term's curriculum.", color: "var(--grade-8)" },
          ].map(p => (
            <div key={p.days} className="rounded-xl p-5 border border-border bg-gradient-card">
              <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: `hsl(${p.color})` }}>{p.days}</div>
              <h3 className="font-display font-bold text-lg mb-2">{p.focus}</h3>
              <p className="text-sm text-muted-foreground">{p.actions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
