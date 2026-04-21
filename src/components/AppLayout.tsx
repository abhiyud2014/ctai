import { NavLink, Outlet, Link } from "react-router-dom";
import { Brain, BookOpen, GraduationCap, FlaskConical, Library, Shield, Trophy, Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Brain, end: true },
  { to: "/classes", label: "Classes 3–8", icon: GraduationCap },
  { to: "/simulations", label: "Simulations", icon: FlaskConical },
  { to: "/quizzes", label: "Quizzes", icon: Trophy },
  { to: "/workshop", label: "Teacher Workshop", icon: BookOpen },
  { to: "/ethics", label: "AI Ethics", icon: Shield },
  { to: "/glossary", label: "Glossary", icon: Library },
  { to: "/resources", label: "Resources", icon: Download },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col mesh-bg">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-[var(--shadow-elegant)] group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base">AI Readiness Hub</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">CBSE 2026-27 · CT & AI</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container py-3 flex flex-col gap-1">
              {nav.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2",
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 mt-16">
        <div className="container py-10 grid gap-6 md:grid-cols-3 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">AI Readiness Hub</span>
            </div>
            <p className="text-muted-foreground">
              An interactive companion to the CBSE Curriculum Framework for Computational Thinking & AI (Classes 3–8).
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Authors</h4>
            <p className="text-muted-foreground">
              Manas Kumar Rath & Tanmaya Swain — AI & GenAI Architects · Former Academicians (KIIT University).
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Reference</h4>
            <p className="text-muted-foreground">
              Aligned with NEP 2020, NCF-SE 2023 and the CBSE CTAI Framework for Primary Stage 2026-27.
            </p>
          </div>
        </div>
        <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
          © Cygnimax 2026 · Built for educators, students & curious minds.
        </div>
      </footer>
    </div>
  );
}
