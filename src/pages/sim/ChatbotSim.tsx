import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Send, X, Bot, User } from "lucide-react";
import SimHelp from "@/components/SimHelp";

type Rule = { keyword: string; response: string };
type Msg = { role: "user" | "bot"; text: string };

const seedRules: Rule[] = [
  { keyword: "hello", response: "Hi there! 👋 I'm a tiny rule-based bot." },
  { keyword: "name", response: "I don't have one yet — you can name me!" },
  { keyword: "bye", response: "Goodbye! Come back soon." },
];

export default function ChatbotSim() {
  const [rules, setRules] = useState<Rule[]>(seedRules);
  const [kw, setKw] = useState("");
  const [resp, setResp] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "Hi! Try saying 'hello' or add a new rule on the left." }]);
  const [input, setInput] = useState("");

  const addRule = () => {
    if (!kw.trim() || !resp.trim()) return;
    setRules([...rules, { keyword: kw.toLowerCase().trim(), response: resp.trim() }]);
    setKw(""); setResp("");
  };

  const removeRule = (i: number) => setRules(rules.filter((_, k) => k !== i));

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    const match = rules.find(r => lower.includes(r.keyword));
    const reply = match ? match.response : "🤔 I don't know that one yet. Add a rule for it!";
    setMsgs([...msgs, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="container py-12 max-w-5xl">
      <Link to="/simulations" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" /> All simulations</Link>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl md:text-4xl font-display font-bold">Mini Chatbot Builder</h1>
        <SimHelp
          title="Mini Chatbot Builder"
          goal="Build your own rule-based chatbot and feel why pure keyword matching is both powerful and limited."
          steps={[
            "On the left, type a keyword (e.g. 'weather') and a response (e.g. 'It's sunny in Delhi today!').",
            "Click + Add rule. The new rule appears in the list below.",
            "On the right, type a message containing your keyword and press Send.",
            "Try a message with NO matching keyword — see the bot's fallback reply."
          ]}
          examples={[
            "Keyword: 'homework' → Response: 'Need help with maths or English?'",
            "Keyword: 'joke' → Response: 'Why did the computer go to the doctor? It had a virus!'",
            "Keyword: 'thanks' → Response: 'You're welcome! 😊'"
          ]}
          tip="Real LLMs like ChatGPT don't use keyword rules — they predict the next word from billions of examples. But the principle 'input → look-up → output' is the same."
        />
      </div>
      <p className="text-muted-foreground mb-6">Add keyword → response rules, then chat with your bot. This is exactly how early chatbots worked.</p>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="card-elevated p-5">
          <h2 className="font-display font-bold mb-3">Rules ({rules.length})</h2>
          <div className="space-y-2 mb-4 max-h-60 overflow-auto">
            {rules.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-sm bg-muted/50 px-3 py-2 rounded-lg">
                <div><strong>"{r.keyword}"</strong> → {r.response}</div>
                <button onClick={() => removeRule(i)} className="text-destructive p-1"><X className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-3 border-t border-border">
            <input value={kw} onChange={e => setKw(e.target.value)} placeholder="If user says (keyword)…" className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background" />
            <input value={resp} onChange={e => setResp(e.target.value)} placeholder="…bot replies with" className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background" />
            <Button onClick={addRule} className="w-full bg-gradient-hero"><Plus className="w-4 h-4 mr-1" />Add rule</Button>
          </div>
        </div>

        <div className="card-elevated p-5 flex flex-col">
          <h2 className="font-display font-bold mb-3">Chat</h2>
          <div className="flex-1 space-y-3 mb-3 max-h-80 overflow-auto">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "bot" && <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>}
                <div className={`text-sm px-3 py-2 rounded-2xl max-w-[75%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}</div>
                {m.role === "user" && <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0"><User className="w-4 h-4" /></div>}
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-3 border-t border-border">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background" />
            <Button onClick={send}><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
