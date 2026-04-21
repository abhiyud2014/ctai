import { useEffect, useState } from "react";
import { getProgress, Progress } from "@/lib/progress";

export function useProgress(): Progress {
  const [progress, setProgress] = useState<Progress>(() => getProgress());
  useEffect(() => {
    const handler = () => setProgress(getProgress());
    window.addEventListener("progress-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("progress-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return progress;
}
