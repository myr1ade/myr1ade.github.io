import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { isValidEmail, isValidUrl } from "../lib";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import TextReveal from "./TextReveal";

export default function Contact() {
  const { contact } = portfolio;
  const email = isValidEmail(contact.email) ? contact.email.trim() : "";
  const socials = contact.socials.filter((s) => isValidUrl(s.url));

  // The button always points somewhere real: email first, else the first social link.
  const buttonHref = email ? `mailto:${email}` : socials[0]?.url ?? "";
  const buttonExternal = !email && !!socials[0];

  return (
    <section id="contact" aria-labelledby="contact-title" className="paper-dark page-x py-24 md:py-40">
      <div className="page-w">
        <SectionLabel index="06">Contact</SectionLabel>

        <div className="relative mt-8">
          <TextReveal id="contact-title" as="h2" mode="line" text={contact.heading} className="display display-xl lowercase" />
          <Reveal delay={0.45} y={6} className="mt-1 md:absolute md:bottom-[-0.6em] md:left-[44%] md:mt-0">
            <span className="script inline-block -rotate-6 text-[clamp(3rem,8vw,7.5rem)]">{contact.annotation}</span>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-[34ch] text-[clamp(1.15rem,1.7vw,1.5rem)] font-medium leading-snug text-ink">{contact.text}</p>
            {buttonHref && (
              <div className="mt-10">
                <MagneticButton href={buttonHref} label={contact.buttonLabel} external={buttonExternal} />
              </div>
            )}
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            {email && (
              <Reveal delay={0.1}>
                <p className="meta text-muted">Email</p>
                <a href={`mailto:${email}`} className="u-link mt-3 inline-block break-all font-display text-[clamp(1.4rem,3.2vw,2.75rem)] font-extrabold tracking-[-0.04em] text-ink hover:text-accent-dark">
                  {email}
                </a>
              </Reveal>
            )}

            {socials.length > 0 && (
              <Reveal delay={0.18}>
                <p className="meta text-muted">Elsewhere</p>
                <ul className="mt-3 border-t hairline">
                  {socials.map((s) => (
                    <li key={s.label} className="border-b hairline">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-4 text-lg font-medium text-ink"
                      >
                        <span className="transition-transform duration-500 group-hover:translate-x-1">{s.label}</span>
                        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" strokeWidth={1.5} />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
