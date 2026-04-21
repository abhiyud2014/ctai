import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, RefreshCw } from "lucide-react";
import SimHelp from "@/components/SimHelp";

const arr = Array.from({ length: 20 }, (_, i) => (i + 1) * 3); // sorted

export default function SearchSim() {
  const [target, setTarget] = useState(27);
  const [linearSteps, setLinearSteps] = useState<number[]>([]);
  const [binarySteps, setBinarySteps] = useState<number[]>([]);
  const [running, setRunning] = useState(false);

  const reset = () => { setLinearSteps([]); setBinarySteps([]); };

  const run = async () => {
    reset();
    setRunning(true);
    const lin: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      lin.push(i);
      setLinearSteps([...lin]);
      await new Promise(r => setTimeout(r, 120));
      if (arr[i] === target) break;
    }
    const bin: number[] = [];
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      bin.push(mid);
      setBinarySteps([...bin]);
      await new Promise(r => setTimeout(r, 250));
      if (arr[mid] === target) break;
      if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
    }
    setRunning(false);
  };

  useEffect(() => { reset(); }, [target]);

  return (
    <div className="container py-12 max-w-3xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Search Algorithm Race</h1>
        <SimHelp
          title="Search Algorithm Race"
          goal="Feel the speed difference between Linear search (check one by one) and Binary search (cut the list in half each time)."
          steps={[
            "Pick a target number from the list (multiples of 3, from 3 to 60).",
            "Click 'Run race' to watch both algorithms search.",
            "Count the highlighted steps each one takes.",
            "Try a number near the start vs near the end — see how Linear changes but Binary stays small."
          ]}
          examples={[
            "Target = 3 → Linear: 1 step. Binary: ~4 steps. Linear wins.",
            "Target = 60 → Linear: 20 steps. Binary: ~5 steps. Binary wins big.",
            "On 1 million items, Binary needs ~20 steps; Linear needs up to 1,000,000."
          ]}
          tip="Binary search ONLY works on sorted lists. That's why databases keep their indexes sorted — fast lookup is the whole point."
        />
      </div>
      <p className="text-muted-foreground mb-6">Two algorithms hunt for the same number. Which one wins on a sorted list?</p>

      <div className="card-elevated p-6 mb-5">
        <div className="flex flex-wrap gap-3 items-end mb-5">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">Target</label>
            <select value={target} onChange={e => setTarget(+e.target.value)} disabled={running} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              {arr.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <Button onClick={run} disabled={running} className="bg-gradient-hero"><Play className="w-4 h-4 mr-1" />Race!</Button>
          <Button onClick={reset} variant="ghost" size="sm"><RefreshCw className="w-4 h-4 mr-1" />Reset</Button>
        </div>

        <Row title="Linear search" steps={linearSteps} target={target} />
        <Row title="Binary search" steps={binarySteps} target={target} />

        <div className="grid grid-cols-2 gap-3 mt-5 text-center">
          <Stat label="Linear steps" value={linearSteps.length} />
          <Stat label="Binary steps" value={binarySteps.length} />
        </div>
      </div>

      <div className="card-elevated p-5 bg-primary/5">
        <h3 className="font-semibold mb-1">💡 Why binary wins</h3>
        <p className="text-sm text-muted-foreground">Binary search halves the list each step. For 1 million items, linear takes ~1M tries; binary takes ~20.</p>
      </div>
    </div>
  );
}

function Row({ title, steps, target }: { title: string; steps: number[]; target: number }) {
  const last = steps.at(-1);
  return (
    <div className="mb-4">
      <div className="text-sm font-semibold mb-2">{title}</div>
      <div className="flex flex-wrap gap-1.5">
        {arr.map((n, i) => {
          const visited = steps.includes(i);
          const current = i === last;
          const found = current && n === target;
          return (
            <div key={i} className={`w-10 h-10 rounded flex items-center justify-center text-xs font-mono font-semibold transition-colors ${found ? "bg-success text-success-foreground" : current ? "bg-primary text-primary-foreground" : visited ? "bg-muted text-muted-foreground" : "bg-card border border-border"}`}>
              {n}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="text-2xl font-display font-bold gradient-text">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}
