import React from "react";
import Home from "../sections/Home";
import Ls from "../sections/Ls";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";

/**
 * Builds the command -> output lookup table.
 *
 * `onSelectCommand` is handed to "ls" so its navbar buttons can trigger
 * another command (played through the typing animation) instead of just
 * statically listing command names.
 */

export function buildCommandRegistry(onSelectCommand) {
  const registry = {
    home: () => <Home />,
    ls: () => <Ls commands={registry} onSelectCommand={onSelectCommand} />,
    about: () => <About />,
    projects: () => <Projects />,
    skills: () => <Skills />,
    experience: () => <Experience />,
    contact: () => <Contact />,
  };
  return registry;
}