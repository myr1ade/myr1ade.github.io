import { motion } from "framer-motion";
import { EASE } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

interface Props {
  text: string;
  className?: string;
  /** "word": each word rises from a mask. "line": the whole block rises as one. */
  mode?: "word" | "line";
  as?: "p" | "h2" | "h3" | "span";
  delay?: number;
  stagger?: number;
  id?: string;
}

/**
 * Reveals text as it scrolls into view. The real text is always in the DOM,
 * so screen readers and reduced-motion users get it immediately.
 */
export default function TextReveal({
  text,
  className = "",
  mode = "word",
  as = "p",
  delay = 0,
  stagger = 0.018,
  id,
}: Props) {
  const reduce = useReducedMotionPreference();
  const Tag = as;

  if (reduce) return <Tag id={id} className={className}>{text}</Tag>;

  if (mode === "line") {
    // The observer sits on the (unclipped) mask, not the clipped text inside it,
    // so the reveal always fires.
    return (
      <Tag id={id} className={className}>
        <motion.span
          className="block overflow-hidden pb-[0.08em]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: EASE, delay }}
          >
            {text}
          </motion.span>
        </motion.span>
      </Tag>
    );
  }

  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
