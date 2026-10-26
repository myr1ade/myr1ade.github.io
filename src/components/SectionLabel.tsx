import { motion } from "framer-motion";
import { EASE } from "../config/settings";

interface Props {
  index?: string;
  children: React.ReactNode;
  className?: string;
}

/** Small editorial label: "01 — ABOUT" with a hairline that draws in. */
export default function SectionLabel({ index, children, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {index && <span className="meta text-accent tabular-nums">{index}</span>}
      <motion.span
        aria-hidden
        className="h-px w-10 origin-left bg-ink/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <span className="meta">{children}</span>
    </div>
  );
}
