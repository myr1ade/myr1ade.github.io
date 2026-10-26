/* ==========================================================================
   ✏️  EDIT YOUR PORTFOLIO HERE
   --------------------------------------------------------------------------
   This is the ONE file that holds all of the words, links and images shown
   on the website. Change a value, save, and the site updates everywhere.

   Quick map of what to change:
   • Name & signature ........ `identity`
   • Headline & biography ..... `hero`, `about`
   • Education ................ `education`
   • Skills & tools ........... `toolbox`, `twoSides`
   • Projects & images ........ `projects`  (put images in /public/images/)
   • Contact details .......... `contact`
   • Date & year .............. `hero.dateLabel`, `footer.year`
   • Colors & fonts ........... NOT here — see `src/index.css` (top of file)
   • Animation settings ....... NOT here — see `src/config/settings.ts`

   Tip: leave any link as "" (empty) and it will simply be hidden —
   the site never shows a broken or fake link.
   ========================================================================== */

/* ---------- Types (you normally don't need to touch these) ---------- */

export type ProjectStatus = string;

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  /** e.g. "2026" — leave "" to hide */
  year: string;
  /** Path to an image in /public/images, e.g. "/images/ai-hub.jpg". Leave "" for a designed placeholder. */
  image: string;
  /** Short description of the image for screen readers */
  imageAlt: string;
  technologies: string[];
  status: ProjectStatus;
  /** A real, working URL. Leave "" to hide the link. */
  link: string;
  /** Text shown on the link, e.g. "View on GitHub" */
  linkLabel: string;
  featured: boolean;
}

export interface ToolGroup {
  id: string;
  label: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Portfolio {
  identity: {
    name: string;
    firstName: string;
    /** The red handwritten signature across the hero */
    signature: string;
    title: string;
    tagline: string;
  };
  hero: {
    topLeftLabel: string;
    /** The date shown top-right on the cover */
    dateLabel: string;
    /** The giant word on the cover. Keep it short (one word works best). */
    headline: string;
    /** The four small labels along the bottom of the cover */
    bottomLabels: { label: string; href: string }[];
  };
  about: {
    heading: string;
    annotation: string;
    introduction: string;
    /** Small labels under the introduction */
    meta: { label: string; value: string }[];
  };
  education: {
    heading: string;
    annotation: string;
    items: { category: string; value: string; detail?: string }[];
  };
  toolbox: {
    heading: string;
    subtitle: string;
    groups: ToolGroup[];
  };
  interests: string[];
  projects: {
    heading: string;
    subtitle: string;
    items: Project[];
  };
  twoSides: {
    heading: string;
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
    annotation: string;
  };
  contact: {
    heading: string;
    annotation: string;
    text: string;
    /** Your email. Leave "" until you decide which address to show. */
    email: string;
    buttonLabel: string;
    socials: SocialLink[];
  };
  footer: {
    year: string;
    tagline: string;
  };
}

/* ==========================================================================
   ✏️  YOUR CONTENT STARTS HERE
   ========================================================================== */

export const portfolio: Portfolio = {
  /* ---------- Name & signature ---------- */
  identity: {
    name: "Ananya Bongale",
    firstName: "Ananya",
    signature: "Ananya",
    title: "Robotics & Automation Student",
    tagline: "Engineering meets expression.",
  },

  /* ---------- The cover (hero) ---------- */
  hero: {
    topLeftLabel: "Vol. 01",
    dateLabel: "Next",
    headline: "portfolio",
    bottomLabels: [
      { label: "UI/UX Design", href: "#work" },
      { label: "Robotics & Automation", href: "#education" },
      { label: "Skill Set", href: "#toolbox" },
      { label: "Get in Touch", href: "#contact" },
    ],
  },

  /* ---------- About / biography ---------- */
  about: {
    heading: "About me",
    annotation: "beyond the screen",
    introduction:
      "I have too many interests and a habit of turning curiosity into new hobbies. I enjoy digital art, design, programming, and reading. I like making things, figuring things out, and occasionally getting distracted by an entirely new interest before finishing the last one.",
    meta: [
      { label: "Program", value: "B.Tech, Robotics & Automation" },
      { label: "Campus", value: "Symbiosis Institute of Technology, Pune" },
    ],
  },

  /* ---------- Education ---------- */
  education: {
    heading: "Currently exploring",
    annotation: "still learning, always",
    items: [
      { category: "Degree", value: "B.Tech in Robotics & Automation" },
      { category: "Institution", value: "Symbiosis Institute of Technology", detail: "Pune" },
      { category: "Minor", value: "Computer Science & Engineering" },
    ],
  },

  /* ---------- Skills & tools ----------
     Only list what you actually use. No ratings or percentages on purpose. */
  toolbox: {
    heading: "My toolbox",
    subtitle: "Different tools. Different ways to make an idea real.",
    groups: [
      {
        id: "development",
        label: "Development",
        items: ["C++", "Python", "Java", "HTML", "CSS", "JavaScript"],
      },
      {
        id: "design",
        label: "Design & Creative",
        items: ["Figma", "Canva", "Photoshop", "Procreate", "Krita", "Ibis Paint", "Adobe Fresco"],
      },
      {
        id: "engineering",
        label: "Engineering & Tech",
        items: [
          "Robotics & Automation",
          "Artificial Intelligence",
          "Machine Learning",
          "Prompt Engineering",
          "MATLAB / Simulink",
          "Arduino",
          "ESP32",
          "Raspberry Pi",
          "AutoCAD",
          "Fusion 360",
          "ANSYS Workbench",
        ],
      },
    ],
  },

  interests: ["UI/UX Design", "Creative Technology", "Programming", "Artificial Intelligence", "Digital Art"],

  /* ---------- Projects ----------
     These are starting drafts — replace them with your real work.
     To add an image: put e.g. "ai-hub.jpg" in /public/images/ and set
     image: "/images/ai-hub.jpg". Leave image "" for a designed placeholder.
     To remove a project: delete its { ... } block.                        */
  projects: {
    heading: "Selected work",
    subtitle: "Experiments, interfaces, and ideas in progress.",
    items: [
      {
        id: "ai-hub",
        title: "Multi-Model AI Hub",
        category: "AI / Product Concept",
        description:
          "A concept exploring how multiple AI models could be brought together in one workspace, creating a more unified way to interact with different AI tools.",
        year: "",
        image: "",
        imageAlt: "",
        technologies: ["Product Thinking", "UI/UX", "AI"],
        status: "Concept / In Development",
        link: "",
        linkLabel: "View project",
        featured: true,
      },
      {
        id: "game-dev",
        title: "Game Development",
        category: "Frontend Development",
        description:
          "An ongoing collaborative game project, contributing to the frontend and exploring the relationship between interface design and interactive experiences.",
        year: "",
        image: "",
        imageAlt: "",
        technologies: ["Frontend", "Interaction Design", "Collaboration"],
        status: "In Development",
        link: "",
        linkLabel: "View project",
        featured: true,
      },
      {
        id: "ui-explorations",
        title: "UI/UX Explorations",
        category: "Interface Design",
        description:
          "A collection of interface concepts, visual experiments, layouts, and prototypes exploring usability, typography, and digital product experiences.",
        year: "",
        image: "",
        imageAlt: "",
        technologies: ["Figma", "Typography", "Prototyping"],
        status: "Personal Exploration",
        link: "",
        linkLabel: "View project",
        featured: true,
      },
    ],
  },

  /* ---------- Engineering × Design ---------- */
  twoSides: {
    heading: "Two sides. One process.",
    left: { title: "Engineering", items: ["Robotics", "Automation", "Programming", "Artificial Intelligence"] },
    right: { title: "Design", items: ["UI/UX", "Prototyping", "Graphic Design", "Digital Art"] },
    annotation: "where they meet",
  },

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let's connect.",
    annotation: "say hello",
    text: "Interested in design, technology, collaboration, or an interesting idea? Get in touch.",
    email: "", // ← add your email, e.g. "name@example.com"
    buttonLabel: "Get in touch",
    socials: [
      { label: "GitHub", url: "" },
      { label: "LinkedIn", url: "" },
      { label: "Instagram", url: "" },
      { label: "Behance", url: "" },
      { label: "Dribbble", url: "" },
    ],
  },

  /* ---------- Footer ---------- */
  footer: {
    year: "2026",
    tagline: "Robotics × Design",
  },
};
