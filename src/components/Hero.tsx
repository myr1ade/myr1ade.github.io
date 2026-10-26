import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { EASE, SIGNATURE_PARALLAX_PX } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import { useFinePointer } from "../hooks/useFinePointer";
import { scrollToHash } from "../lib";
import Signature from "./Signature";
import { NAV_LINKS } from "./Navbar";

interface Props {
  /** When true the cover choreography plays. */
  play: boolean;
  onOpenMenu: () => void;
}

export default function Hero({ play, onOpenMenu }: Props) {
  const { hero, identity } = portfolio;
  const reduce = useReducedMotionPreference();
  const fine = useFinePointer();

  // Pointer parallax for the signature — motion values only, no re-renders.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const parallaxOn = fine && !reduce && SIGNATURE_PARALLAX_PX > 0;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!parallaxOn) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2 * SIGNATURE_PARALLAX_PX);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2 * SIGNATURE_PARALLAX_PX);
  };

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash(hash);
  };

  // Shared timeline (seconds from `play`)
  const t = { top: 0.05, title: 0.15, sig: 0.75, bottom: 1.15 };
  const state = play ? "show" : "hidden";
  const fadeDown = {
    hidden: { opacity: 0, y: reduce ? 0 : -10 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: t.top + i * 0.06 } }),
  };

  const split = Math.floor(hero.headline.length / 2);
  const firstHalf = hero.headline.slice(0, split);
  const secondHalf = hero.headline.slice(split);
  const revealLine = (text: string, extraDelay: number) => (
    <motion.span
      className="hero-word block"
      initial={reduce ? false : { clipPath: "inset(100% -5% -30% -5%)", y: "0.22em" }}
      animate={play ? { clipPath: "inset(-30% -5% -30% -5%)", y: "0em" } : undefined}
      transition={{ duration: 1.05, ease: EASE, delay: t.title + extraDelay }}
    >
      {text}
    </motion.span>
  );

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="paper relative flex min-h-[100svh] flex-col page-x"
    >
      <div className="page-w flex min-h-[100svh] flex-1 flex-col">
        {/* ---------- Top row ---------- */}
        <header className="flex items-start justify-between gap-6 pt-[max(1.5rem,6vh)] md:pt-[max(2rem,7.5vh)]">
          <motion.div variants={fadeDown} initial={reduce ? false : "hidden"} animate={state} custom={0} className="flex flex-col gap-1.5">
            <span className="font-display text-[0.8125rem] font-bold tracking-[-0.01em] text-ink-soft md:text-[0.95rem]">
              {hero.topLeftLabel}
            </span>
            <span className="text-[0.75rem] text-ink-soft md:hidden">{hero.dateLabel}</span>
          </motion.div>

          {/* Index links on the cover (desktop) — becomes the sticky nav later */}
          <motion.nav
            aria-label="Cover index"
            variants={fadeDown}
            initial={reduce ? false : "hidden"}
            animate={state}
            custom={1}
            className="hidden items-center gap-9 pt-1 lg:flex"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={go(`#${l.id}`)} className="u-link meta !text-[0.6875rem] text-ink-soft hover:text-ink">
                {l.label}
              </a>
            ))}
          </motion.nav>

          <motion.div variants={fadeDown} initial={reduce ? false : "hidden"} animate={state} custom={2} className="flex items-center">
            <a
              href="#about"
              onClick={go("#about")}
              aria-label={`${hero.dateLabel} — start reading`}
              className="group hidden items-center gap-4 text-[0.8125rem] text-ink-soft transition-colors hover:text-ink md:flex"
            >
              <span className="u-link">{hero.dateLabel}</span>
              <motion.span
                initial={reduce ? false : { x: -8, opacity: 0 }}
                animate={play ? { x: 0, opacity: 1 } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: t.bottom + 0.2 }}
                className="inline-flex"
              >
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.25}
                  className="h-5 w-6 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5"
                />
              </motion.span>
            </a>
            <button
              type="button"
              onClick={onOpenMenu}
              className="meta -mr-2 ml-6 flex items-center gap-2 p-2 text-ink lg:hidden"
              aria-label="Open menu"
            >
              Menu <Menu aria-hidden className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </motion.div>
        </header>

        {/* ---------- The poster ---------- */}
        <div className="relative flex flex-1 items-center justify-center py-10">
          <h1 id="hero-title" className="relative w-full text-center">
            <span className="sr-only">
              {identity.name} — {hero.topLeftLabel}
            </span>

            {/* Desktop/tablet: one line, edge to edge */}
            <span aria-hidden className="hero-line block">
              {revealLine(hero.headline, 0)}
            </span>
            {/* Phone: the word breaks into a stacked poster so it can stay huge */}
            <span aria-hidden className="hero-stack block">
              {revealLine(firstHalf, 0)}
              {revealLine(secondHalf, 0.09)}
            </span>

            <span aria-hidden className="hero-signature absolute">
              <motion.span className="block" style={parallaxOn ? { x: sx, y: sy } : undefined}>
                <Signature
                  text={identity.signature}
                  size="var(--sig)"
                  play={play}
                  delay={t.sig}
                  duration={1.15}
                />
              </motion.span>
            </span>
          </h1>
        </div>

        {/* ---------- Bottom metadata ---------- */}
        <motion.ul
          initial={reduce ? false : "hidden"}
          animate={state}
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: t.bottom } } }}
          className="grid grid-cols-2 gap-x-6 gap-y-3 border-t hairline pb-[max(1.5rem,5vh)] pt-5 lg:grid-cols-4 md:pt-6"
        >
          {hero.bottomLabels.map((item, i) => (
            <motion.li
              key={item.label}
              variants={{ hidden: { opacity: 0, y: reduce ? 0 : 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className={
                i === 0 ? "" : i === hero.bottomLabels.length - 1 ? "text-right" : i % 2 === 1 ? "text-right lg:text-center" : "lg:text-center"
              }
            >
              <a
                href={item.href}
                onClick={go(item.href)}
                className={`u-link meta !text-[0.625rem] md:!text-[0.6875rem] hover:text-ink ${
                  i === hero.bottomLabels.length - 1 ? "!text-ink" : ""
                }`}
              >
                {item.label}
                {i === hero.bottomLabels.length - 1 && <span className="ml-1.5 text-accent">↗</span>}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
