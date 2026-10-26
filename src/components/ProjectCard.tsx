import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/portfolio";
import { EASE } from "../config/settings";
import { useReducedMotionPreference } from "../hooks/useReducedMotionPreference";
import { isValidUrl, pad2 } from "../lib";

interface Props {
  project: Project;
  index: number;
}

/** Designed placeholder used when a project has no image (or it fails to load). */
function Placeholder({ project }: { project: Project }) {
  const initials = project.title
    .split(/[\s/]+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toLowerCase();

  return (
    <div className="paper-dark absolute inset-0 overflow-hidden">
      {/* fine drafting grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 8) calc(100% / 6)",
        }}
      />
      <span aria-hidden className="display absolute -bottom-[0.14em] -right-[0.04em] text-[clamp(7rem,17vw,15rem)] leading-none text-ink">
        {initials}
      </span>
      <div className="absolute left-5 top-5 flex max-w-[70%] flex-col gap-1">
        <span className="meta !text-[0.625rem] text-ink">{project.category}</span>
        <span className="meta !text-[0.625rem] text-muted">{project.status}</span>
      </div>
      <span aria-hidden className="absolute right-5 top-5 h-2 w-2 rounded-full bg-accent" />
    </div>
  );
}

export default function ProjectCard({ project, index }: Props) {
  const reduce = useReducedMotionPreference();
  const [imgFailed, setImgFailed] = useState(false);
  const flip = index % 2 === 1;
  const hasImage = !!project.image && !imgFailed;
  const hasLink = isValidUrl(project.link);
  const external = hasLink && /^https?:/.test(project.link);

  const item = (y = 18, delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.85, ease: EASE, delay },
  });

  return (
    <article
      className="project group grid grid-cols-1 gap-x-8 gap-y-8 border-t hairline py-12 md:grid-cols-12 md:py-20"
      aria-labelledby={`project-${project.id}`}
    >
      {/* Number */}
      <motion.div {...item(0)} className="md:col-span-2">
        <span className="display block text-[clamp(3.5rem,8vw,7.5rem)] tabular-nums text-ink/90 transition-colors duration-500 group-hover:text-accent">
          {pad2(index + 1)}
        </span>
      </motion.div>

      {/* Text */}
      <div className={`flex flex-col md:col-span-5 ${flip ? "md:order-3 md:col-start-8" : "md:order-2"}`}>
        <motion.p {...item(10, 0.1)} className="meta text-accent">
          {project.category}
        </motion.p>
        <motion.div
          className="mt-4 overflow-hidden pb-[0.1em]"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.h3
            id={`project-${project.id}`}
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
            className="display display-lg !text-[clamp(2.3rem,5vw,4.5rem)]"
          >
            {project.title}
          </motion.h3>
        </motion.div>
        <motion.p {...item(14, 0.25)} className="mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          {project.description}
        </motion.p>

        <motion.div {...item(10, 0.35)} className="mt-auto pt-10">
          <dl className="grid grid-cols-2 gap-4 border-t hairline pt-5">
            <div>
              <dt className="meta !text-[0.625rem] text-muted">Status</dt>
              <dd className="mt-1.5 text-sm font-medium">{project.status}</dd>
            </div>
            {project.year && (
              <div>
                <dt className="meta !text-[0.625rem] text-muted">Year</dt>
                <dd className="mt-1.5 text-sm font-medium tabular-nums">{project.year}</dd>
              </div>
            )}
          </dl>
          {project.technologies.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {project.technologies.map((t) => (
                <li key={t} className="border hairline px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {hasLink && (
            <a
              href={project.link}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <span className="u-link">{project.linkLabel || "View project"}</span>
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-accent" strokeWidth={1.5} />
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          )}
        </motion.div>
      </div>

      {/* Visual */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
        className={`relative md:col-span-5 ${flip ? "md:order-2 md:col-start-3" : "md:order-3"}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]">
            {hasImage ? (
              <img
                src={project.image}
                alt={project.imageAlt || `${project.title} — project visual`}
                loading="lazy"
                decoding="async"
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <Placeholder project={project} />
            )}
          </div>
        </div>
        {/* hover annotation */}
        <span
          aria-hidden
          className={`script pointer-events-none absolute -top-7 text-[2rem] opacity-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100 ${
            flip ? "-left-2 -rotate-6" : "-right-2 rotate-[-4deg]"
          }`}
        >
          {project.status.toLowerCase().includes("concept") ? "just an idea… for now" : "in the works"}
        </span>
      </motion.div>
    </article>
  );
}
