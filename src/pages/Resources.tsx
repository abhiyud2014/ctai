import { Download, FileText, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "CBSE CTAI Primary Framework 2026-27", url: "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri_2026-27.pdf", desc: "Official curriculum document." },
  { label: "NEP 2020", url: "https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf", desc: "National Education Policy." },
  { label: "NCF-SE 2023", url: "https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf", desc: "National Curriculum Framework for School Education." },
  { label: "Scratch 3.0", url: "https://scratch.mit.edu/", desc: "Visual programming for Classes 6–8." },
  { label: "Google Teachable Machine", url: "https://teachablemachine.withgoogle.com/", desc: "Train ML models in your browser." },
  { label: "AutoDraw", url: "https://www.autodraw.com/", desc: "AI sketch completion — pattern recognition demo." },
  { label: "Quick, Draw!", url: "https://quickdraw.withgoogle.com/", desc: "Neural network guessing game." },
];

export default function Resources() {
  return (
    <div className="container py-12">
      <header className="max-w-2xl mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2 inline-flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Resources</div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Downloads & Tools</h1>
        <p className="text-muted-foreground">Everything you need to start teaching CT and AI tomorrow.</p>
      </header>

      <section className="mb-10">
        <h2 className="font-display font-bold text-2xl mb-4">📕 Companion eBook</h2>
        <div className="card-elevated p-6 flex flex-wrap items-center gap-5 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="w-16 h-16 rounded-xl bg-gradient-hero text-white flex items-center justify-center shadow-[var(--shadow-elegant)]">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-display font-bold text-lg">Building AI-Readiness</h3>
            <p className="text-sm text-muted-foreground">By Manas Kumar Rath & Tanmaya Swain · Dual-Author Edition · 33 pages</p>
          </div>
          <Button asChild className="bg-gradient-hero">
            <a href="/resources/Building_AI_Readiness_Dual_Author_Edition.pdf" download>
              <Download className="w-4 h-4 mr-1" /> Download PDF
            </a>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display font-bold text-2xl mb-4">🔗 External Resources</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="card-elevated p-5 group">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-1.5 group-hover:text-primary">
                    {l.label} <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{l.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
