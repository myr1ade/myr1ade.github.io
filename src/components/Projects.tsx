import { portfolio } from "../data/portfolio";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

export default function Projects() {
  const { projects } = portfolio;
  return (
    <section id="work" aria-labelledby="work-title" className="paper page-x py-24 md:py-36">
      <div className="page-w">
        <SectionLabel index="04">Work</SectionLabel>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <TextReveal id="work-title" as="h2" mode="line" text={projects.heading} className="display display-xl lowercase" />
          <p className="max-w-[26ch] pb-3 text-lg leading-snug text-ink-soft">{projects.subtitle}</p>
        </div>

        <div className="mt-16 md:mt-24">
          {projects.items.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          <div aria-hidden className="h-px bg-[var(--line)]" />
        </div>
      </div>
    </section>
  );
}
