import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";
import { EASE } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

export default function Education() {
  const { education } = portfolio;
  const reduce = useReducedMotionPreference();

  return (
    <section id="education" aria-labelledby="edu-title" className="paper relative overflow-hidden page-x pb-[clamp(9rem,24vw,24rem)] pt-8">
      <div className="page-w">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <SectionLabel index="02">Education</SectionLabel>
            <TextReveal id="edu-title" as="h2" mode="line" text={education.heading} className="display display-lg mt-8 lowercase" />
          </div>
          <span className="script -rotate-2 pb-2 text-[clamp(1.6rem,2.6vw,2.4rem)]">{education.annotation}</span>
        </div>

        <ol className="mt-14 md:mt-20">
          {education.items.map((item, i) => (
            <li key={item.category} className="relative">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-px origin-left bg-[var(--line)]"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
              />
              <motion.div
                className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-7 md:py-9"
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ staggerChildren: 0.08, delayChildren: 0.15 + i * 0.12 }}
              >
                <motion.span
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  transition={{ duration: 0.6 }}
                  className="meta col-span-12 flex items-center gap-3 text-muted md:col-span-3"
                >
                  <span className="tabular-nums text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  {item.category}
                </motion.span>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="display display-md col-span-11 md:col-span-8"
                >
                  {item.value}
                  {item.detail && <span className="font-body text-[0.45em] font-medium tracking-normal text-muted">{"  "}— {item.detail}</span>}
                </motion.p>
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                  className="col-span-1 h-2 w-2 justify-self-end rounded-full bg-accent"
                />
              </motion.div>
            </li>
          ))}
          <li aria-hidden className="h-px bg-[var(--line)]" />
        </ol>
      </div>

      {/* Oversized typographic detail */}
      <span aria-hidden className="display outline-text pointer-events-none absolute -bottom-[0.2em] right-[-0.04em] select-none text-[clamp(8rem,26vw,26rem)] opacity-[0.12]">
        b.tech
      </span>
    </section>
  );
}
