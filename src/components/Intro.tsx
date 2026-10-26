import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE, INTRO_DURATION } from "../config/settings";

interface Props {
  name: string;
  label: string;
  /** Called when the cover underneath should begin its reveal. */
  onReveal: () => void;
}

/**
 * ~1.2s "printed cover" intro: label → hairline draws across → name.
 * Then the sheet lifts away and the hero takes over.
 */
export default function Intro({ name, label, onReveal }: Props) {
  useEffect(() => {
    const t = window.setTimeout(onReveal, INTRO_DURATION * 1000);
    return () => window.clearTimeout(t);
  }, [onReveal]);

  const d = INTRO_DURATION;
  return (
    <motion.div
      className="paper fixed inset-0 z-[60] flex flex-col justify-center page-x"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
      aria-hidden
    >
      <div className="page-w relative">
        <motion.p
          className="meta absolute -top-10 left-0 !normal-case !tracking-[0.02em] !text-sm text-ink"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d * 0.35, ease: EASE }}
        >
          {label}
        </motion.p>
        <motion.span
          className="block h-px w-full origin-left bg-ink/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: d * 0.6, ease: [0.65, 0, 0.35, 1], delay: d * 0.12 }}
        />
        <div className="mt-4 flex justify-between overflow-hidden">
          <motion.p
            className="meta text-ink"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: d * 0.45, ease: EASE, delay: d * 0.45 }}
          >
            {name}
          </motion.p>
          <motion.p
            className="meta text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: d * 0.4, delay: d * 0.6 }}
          >
            Vol. 01
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
