import { HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

type Props = {
  title: string;
  goal: string;
  steps: string[];
  examples?: string[];
  tip?: string;
};

export default function SimHelp({ title, goal, steps, examples, tip }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          aria-label="How to use this simulation"
        >
          <HelpCircle className="w-3.5 h-3.5" /> Help
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> How to use: {title}
          </DialogTitle>
          <DialogDescription className="text-left pt-2 text-foreground">
            <span className="block font-semibold text-foreground mb-1">🎯 Goal</span>
            <span className="block text-muted-foreground">{goal}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold mb-2">📋 Steps</div>
            <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground marker:text-primary marker:font-bold">
              {steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>

          {examples && examples.length > 0 && (
            <div>
              <div className="font-semibold mb-2">💡 Example answers</div>
              <ul className="space-y-1.5">
                {examples.map((e, i) => (
                  <li key={i} className="text-muted-foreground bg-muted/50 rounded-md px-3 py-2 text-xs">{e}</li>
                ))}
              </ul>
            </div>
          )}

          {tip && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <div className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">Pro tip</div>
              <div className="text-muted-foreground">{tip}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
