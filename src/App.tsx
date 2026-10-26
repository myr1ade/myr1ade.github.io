import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { portfolio } from "./data/portfolio";
import { SHOW_INTRO } from "./config/settings";
import { useReducedMotionPreference } from "./hooks/useReducedMotionPreference";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CreativeProcess from "./components/CreativeProcess";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const reduce = useReducedMotionPreference();
  // Skip the intro when disabled, when motion is reduced, or when landing on a deep link.
  const [introActive, setIntroActive] = useState(
    () => SHOW_INTRO && !window.location.hash && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const reveal = useCallback(() => setIntroActive(false), []);

  useEffect(() => {
    if (reduce) setIntroActive(false);
  }, [reduce]);

  useEffect(() => {
    document.title = `${portfolio.identity.name} — Portfolio`;
  }, []);

  return (
    <>
      <AnimatePresence>
        {introActive && <Intro key="intro" name={portfolio.identity.name} label={portfolio.hero.topLeftLabel} onReveal={reveal} />}
      </AnimatePresence>

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <Hero play={!introActive} onOpenMenu={() => setMenuOpen(true)} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <CreativeProcess />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
