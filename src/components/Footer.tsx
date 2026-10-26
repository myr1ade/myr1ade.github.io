import { ArrowUp } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { scrollToHash } from "../lib";

export default function Footer() {
  const { identity, footer } = portfolio;
  return (
    <footer className="paper-dark page-x">
      <div className="page-w grid grid-cols-2 items-center gap-y-4 border-t hairline py-7 md:grid-cols-3">
        <span className="meta !text-ink">{identity.name}</span>
        <span className="meta hidden text-center md:block">{footer.tagline}</span>
        <div className="flex items-center justify-end gap-6">
          <span className="meta">© {footer.year}</span>
          <button
            type="button"
            onClick={() => scrollToHash("#top")}
            className="group flex h-9 w-9 items-center justify-center border hairline text-ink transition-colors hover:border-accent"
            aria-label="Back to top"
          >
            <ArrowUp aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:text-accent" strokeWidth={1.5} />
          </button>
        </div>
        <span className="meta col-span-2 md:hidden">{footer.tagline}</span>
      </div>
    </footer>
  );
}
