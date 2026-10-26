/* ==========================================================================
   ANIMATION & LAYOUT SETTINGS
   Visual behaviour lives here, separate from your personal content.
   ========================================================================== */

/** Play the short "cover reveal" intro on first load. Set false to show the cover immediately. */
export const SHOW_INTRO = true;

/** Length of the intro overlay in seconds (keep between ~1 and 2). */
export const INTRO_DURATION = 1.25;

/** The signature drifts by at most this many pixels when the pointer moves. 0 = off. */
export const SIGNATURE_PARALLAX_PX = 3;

/** How strongly the contact button follows the pointer (desktop only). 0 = off. */
export const MAGNETIC_STRENGTH = 0.18;

/** Shared easing curve — a calm ease-out. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Base duration for scroll reveals, in seconds. */
export const REVEAL_DURATION = 0.8;
