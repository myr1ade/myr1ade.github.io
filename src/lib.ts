/** A link is only rendered when it's a real, non-empty URL. */
export function isValidUrl(url: string | undefined | null): url is string {
  if (!url) return false;
  const u = url.trim();
  if (!u) return false;
  if (u.startsWith("mailto:") || u.startsWith("#") || u.startsWith("/")) return true;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function isValidEmail(email: string | undefined | null): email is string {
  return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Smooth-scrolls to an in-page anchor and moves keyboard focus there. */
export function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = id ? document.getElementById(id) : document.body;
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (id) {
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  } else {
    history.replaceState(null, "", window.location.pathname);
  }
}
