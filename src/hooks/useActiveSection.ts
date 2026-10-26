import { useEffect, useState } from "react";

/** Returns the id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        const first = ids.find((id) => visible.has(id));
        setActive(first ?? "");
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}
