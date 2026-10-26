import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MAGNETIC_STRENGTH } from "../config/settings";
import { useFinePointer } from "../hooks/useFinePointer";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";

interface Props {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Minimal outlined button. On desktop it leans gently toward the pointer;
 * on touch devices and with reduced motion it stays perfectly still.
 * Pointer movement updates motion values directly — no React re-renders.
 */
export default function MagneticButton({ href, label, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotionPreference();
  const active = fine && !reduce && MAGNETIC_STRENGTH > 0;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * MAGNETIC_STRENGTH);
    my.set((e.clientY - (r.top + r.height / 2)) * MAGNETIC_STRENGTH);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      className="inline-block"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={active ? { x, y } : undefined}
    >
      <a
        ref={ref}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex items-center gap-4 border border-ink px-7 py-4 text-ink transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-accent hover:bg-paper-light focus-visible:border-accent md:px-9 md:py-5"
      >
        <span className="meta !text-[0.8125rem] !tracking-[0.18em] text-ink">{label}</span>
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-accent"
          strokeWidth={1.5}
        />
      </a>
    </motion.div>
  );
}
