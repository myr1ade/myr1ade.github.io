import { useReducedMotion } from "framer-motion";

/** True when the visitor has asked their OS/browser to reduce motion. */
export function useReducedMotionPreference(): boolean {
  return useReducedMotion() ?? false;
}
