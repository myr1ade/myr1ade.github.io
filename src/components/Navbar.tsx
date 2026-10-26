import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { EASE } from "../config/settings";
import { useActiveSection } from "../hooks/useActiveSection";
import { pad2, scrollToHash } from "../lib";

/** Section anchors used by every navigation surface. */
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "toolbox", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

interface Props {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: Props) {
  const [pastHero, setPastHero] = useState(false);
  const ids = useMemo(() => NAV_LINKS.map((l) => l.id as string), []);
  const active = useActiveSection(ids);
  const closeRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLElement>(null);

  // While hidden above the cover, keep the bar out of the tab order.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    if (pastHero) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [pastHero]);

  // Show the sticky bar once the cover has scrolled away.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: "-64px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Lock scroll + Escape to close + focus the close button when the menu opens.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, setMenuOpen]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    // let the overlay close before scrolling
    window.setTimeout(() => scrollToHash(hash), menuOpen ? 260 : 0);
  };

  return (
    <>
      <a href="#about" onClick={go("#about")} className="sr-only-focusable fixed left-4 top-4 z-[70] bg-ink px-4 py-2 text-sm text-paper">
        Skip to content
      </a>

      {/* ---------- Sticky editorial bar ---------- */}
      <motion.header
        initial={false}
        animate={{ y: pastHero ? 0 : "-100%" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed inset-x-0 top-0 z-40 border-b hairline bg-paper/90 backdrop-blur-[2px] page-x"
        ref={barRef}
      >
        <nav aria-label="Main" className="page-w flex h-14 items-center justify-between md:h-16">
          <a href="#top" onClick={go("#top")} className="meta !text-ink !tracking-[0.18em]">
            {portfolio.identity.name}
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    onClick={go(`#${l.id}`)}
                    aria-current={isActive ? "location" : undefined}
                    className={`u-link meta transition-colors ${isActive ? "!text-ink" : "hover:!text-ink"}`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="meta -mr-2 flex items-center gap-2 p-2 !text-ink md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            Menu <Menu aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </nav>
      </motion.header>

      {/* ---------- Full-screen editorial index (mobile) ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site index"
            className="paper fixed inset-0 z-[65] flex flex-col page-x"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex h-14 items-center justify-between border-b hairline">
              <span className="meta !text-ink">Index</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="meta -mr-2 flex items-center gap-2 p-2 !text-ink"
                aria-label="Close menu"
              >
                Close <X aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-10 flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className="border-b hairline"
                >
                  <a href={`#${l.id}`} onClick={go(`#${l.id}`)} className="flex items-baseline gap-5 py-4">
                    <span className="meta text-accent tabular-nums">{pad2(i + 1)}</span>
                    <span className="display text-[clamp(2.75rem,14vw,5rem)]">{l.label.toLowerCase()}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex items-end justify-between pb-8">
              <span className="script text-[2.6rem]">{portfolio.identity.signature}</span>
              <span className="meta">{portfolio.hero.dateLabel}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
