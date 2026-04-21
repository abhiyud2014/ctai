// Lightweight progress tracking via localStorage.
const KEY = "ai-readiness-progress-v1";

export type Progress = {
  visitedChapters: string[];
  quizScores: Record<string, { score: number; total: number; at: number }>;
  completedActivities: string[];
};

const empty: Progress = { visitedChapters: [], quizScores: {}, completedActivities: [] };

export function getProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function saveProgress(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("progress-updated"));
}

export function markChapterVisited(slug: string) {
  const p = getProgress();
  if (!p.visitedChapters.includes(slug)) {
    p.visitedChapters.push(slug);
    saveProgress(p);
  }
}

export function recordQuizScore(slug: string, score: number, total: number) {
  const p = getProgress();
  const existing = p.quizScores[slug];
  if (!existing || score > existing.score) {
    p.quizScores[slug] = { score, total, at: Date.now() };
    saveProgress(p);
  }
}

export function toggleActivity(id: string) {
  const p = getProgress();
  if (p.completedActivities.includes(id)) {
    p.completedActivities = p.completedActivities.filter(x => x !== id);
  } else {
    p.completedActivities.push(id);
  }
  saveProgress(p);
}

export function resetProgress() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("progress-updated"));
}
