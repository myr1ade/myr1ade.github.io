import { motion } from "framer-motion";
import { EASE } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

interface Props {
  text: string;
  /** CSS color — defaults to the accent red */
  color?: string;
  /** Any CSS font-size, e.g. "clamp(2rem, 6vw, 6rem)" */
  size?: string;
  /** Start the reveal (lets the hero choreograph it). */
  play?: boolean;
  delay?: number;
  duration?: number;
  /** Draws a thin pen flourish under the name */
  flourish?: boolean;
  className?: string;
}

/**
 * A handwritten signature that is "written" left-to-right with a soft
 * clipping mask, then settles with a whisper of overshoot.
 * Script fonts can't be stroke-animated letter by letter, so the mask
 * plus a drawn SVG flourish gives the impression of a pen moving.
 */
export default function Signature({
  text,
  color = "var(--accent)",
  size = "3rem",
  play = true,
  delay = 0,
  duration = 1.1,
  flourish = true,
  className = "",
}: Props) {
  const reduce = useReducedMotionPreference();
  const animateText = reduce || play;

  return (
    <span
      className={`relative inline-block select-none whitespace-nowrap ${className}`}
      style={{ fontSize: size, color }}
    >
      <motion.span
        className="script relative z-10 inline-block px-[0.2em] py-[0.15em]"
        style={{ color }}
        initial={reduce ? false : { clipPath: "inset(-20% 100% -20% 0%)", x: "-0.18em" }}
        animate={
          animateText
            ? { clipPath: "inset(-20% -5% -20% 0%)", x: reduce ? 0 : ["-0.18em", "0.03em", "0em"] }
            : undefined
        }
        transition={{
          clipPath: { duration, ease: [0.45, 0.05, 0.25, 1], delay },
          x: { duration: duration + 0.35, ease: EASE, delay, times: [0, 0.75, 1] },
        }}
      >
        {text}
      </motion.span>

      {flourish && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-[2%] top-[58%] z-0 h-[0.55em] w-[104%] overflow-visible"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M4 30 C 70 20, 140 34, 210 24 S 330 8, 396 14"
            stroke={color}
            strokeWidth={1.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={animateText ? { pathLength: 1, opacity: 0.9 } : undefined}
            transition={{ duration: duration * 0.8, ease: EASE, delay: delay + duration * 0.55 }}
          />
        </svg>
      )}
    </span>
  );
}
