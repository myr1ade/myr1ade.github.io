import { portfolio } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

export default function About() {
  const { about } = portfolio;
  return (
    <section id="about" aria-labelledby="about-title" className="paper page-x py-24 md:py-36">
      <div className="page-w grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <SectionLabel index="01">About</SectionLabel>
          <div className="relative mt-8">
            <TextReveal id="about-title" as="h2" mode="line" text={about.heading} className="display display-xl lowercase" />
            <Reveal delay={0.5} y={8} className="mt-2 pl-[0.4em] md:-mt-3 md:pl-[1.4em]">
              <span className="script inline-block -rotate-3 text-[clamp(1.9rem,3.4vw,3.1rem)]">{about.annotation}</span>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col justify-end lg:col-span-6 lg:pt-24">
          <TextReveal
            text={about.introduction}
            className="max-w-[38ch] font-body text-[clamp(1.25rem,2.05vw,1.875rem)] font-medium leading-[1.38] tracking-[-0.015em] text-ink"
          />
          <dl className="mt-14 grid grid-cols-1 gap-6 border-t hairline pt-6 sm:grid-cols-3">
            {about.meta.map((m, i) => (
              <Reveal key={m.label} delay={0.1 + i * 0.08} y={10}>
                <dt className="meta text-muted">{m.label}</dt>
                <dd className="mt-2 text-[0.95rem] font-medium text-ink">{m.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
