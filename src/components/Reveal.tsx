import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE, REVEAL_DURATION } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

interface Props extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
}

/** Fades + lifts its children into place once they enter the viewport. */
export default function Reveal({ delay = 0, y = 24, children, as = "div", ...rest }: Props) {
  const reduce = useReducedMotionPreference();
  const Comp = as === "li" ? motion.li : as === "span" ? motion.span : motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: REVEAL_DURATION, ease: EASE, delay }}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
}
