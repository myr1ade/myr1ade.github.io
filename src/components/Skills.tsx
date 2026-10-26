import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";
import { EASE } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

export default function Skills() {
  const { toolbox } = portfolio;
  const reduce = useReducedMotionPreference();

  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="paper page-x py-24 md:py-36">
      <div className="page-w">
        <SectionLabel index="03">Skills & Tools</SectionLabel>
        <div className="mt-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <TextReveal id="toolbox-title" as="h2" mode="line" text={toolbox.heading} className="display display-xl lowercase lg:col-span-9" />
          <p className="max-w-[30ch] text-lg leading-snug text-ink-soft lg:col-span-3 lg:justify-self-end lg:pb-3 lg:text-right">
            {toolbox.subtitle}
          </p>
        </div>

        <div className="mt-16 md:mt-24">
          {toolbox.groups.map((group, gi) => (
            <motion.div
              key={group.id}
              className="grid grid-cols-1 gap-x-8 gap-y-5 border-t hairline py-9 md:grid-cols-12 md:py-12"
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ staggerChildren: 0.035, delayChildren: 0.1 }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: EASE }}
                className="md:col-span-4"
              >
                <span className="meta text-accent tabular-nums">3.{gi + 1}</span>
                <h3 className={`display display-md mt-3 lowercase ${gi === 1 ? "outline-text" : ""}`}>{group.label}</h3>
                <p className="meta mt-3 text-muted">{group.items.length} entries</p>
              </motion.div>

              <ul className="flex flex-wrap content-start gap-x-1 gap-y-1 md:col-span-8 md:pt-6">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex items-baseline"
                  >
                    <span className="tool-item group relative cursor-default font-display text-[clamp(1.35rem,2.4vw,2.25rem)] font-semibold tracking-[-0.035em] text-ink-soft transition-[color,transform,font-weight] duration-300 ease-out hover:translate-x-0.5 hover:font-extrabold hover:text-ink">
                      {item}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                      />
                    </span>
                    {i < group.items.length - 1 && (
                      <span aria-hidden className="mx-3 font-display text-[clamp(1.1rem,1.8vw,1.6rem)] font-light text-ink/25">
                        /
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
          <div aria-hidden className="h-px bg-[var(--line)]" />
        </div>
      </div>
    </section>
  );
}
