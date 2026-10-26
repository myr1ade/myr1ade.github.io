import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";
import { EASE } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

/** Engineering × Design — two columns drift toward the centre, then the × lands. */
export default function CreativeProcess() {
  const { twoSides } = portfolio;
  const reduce = useReducedMotionPreference();
  const vp = { once: true, margin: "-15% 0px" } as const;

  const Side = ({ side, align }: { side: { title: string; items: string[] }; align: "left" | "right" }) => (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: align === "left" ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={vp}
      transition={{ duration: 1.1, ease: EASE }}
      className={align === "left" ? "md:text-right" : "md:text-left"}
    >
      <h3 className="display text-[clamp(2.4rem,6.8vw,6.5rem)] lowercase">{side.title}</h3>
      <ul className={`mt-8 flex flex-col border-t hairline ${align === "left" ? "md:items-end" : ""}`}>
        {side.items.map((it, i) => (
          <motion.li
            key={it}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 + i * 0.07 }}
            className="w-full border-b hairline py-3.5 text-[clamp(1.05rem,1.6vw,1.375rem)] font-medium tracking-[-0.01em] text-ink-soft"
          >
            {it}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="process" aria-labelledby="process-title" className="paper page-x py-24 md:py-36">
      <div className="page-w">
        <SectionLabel index="05">Engineering × Design</SectionLabel>
        <TextReveal id="process-title" as="h2" mode="line" text={twoSides.heading} className="display display-lg mt-8 max-w-[14ch] lowercase" />

        <div className="relative mt-16 grid grid-cols-1 gap-y-10 md:mt-24 md:grid-cols-[1fr_auto_1fr] md:gap-x-10 lg:gap-x-16">
          <Side side={twoSides.left} align="left" />

          {/* centre mark */}
          <div className="relative flex items-center justify-center md:flex-col md:justify-start md:pt-[clamp(0.5rem,2vw,2rem)]">
            <motion.span
              aria-hidden
              className="relative z-10 px-4 font-display text-[clamp(3rem,6vw,5.5rem)] font-light leading-none text-accent"
              initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
            >
              ×
            </motion.span>
            <motion.span
              aria-hidden
              className="hidden w-px flex-1 origin-top bg-accent/50 md:mt-4 md:block"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={vp}
              transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            />
            <motion.span
              aria-hidden
              className="script absolute -bottom-9 whitespace-nowrap text-[1.9rem] md:relative md:bottom-auto md:mt-4"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
            >
              {twoSides.annotation}
            </motion.span>
          </div>

          <div className="pt-6 md:pt-0">
            <Side side={twoSides.right} align="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
