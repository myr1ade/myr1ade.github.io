/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-light": "var(--paper-light)",
        "paper-shadow": "var(--paper-shadow)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        script: "var(--font-script)",
      },
      maxWidth: { page: "1600px" },
    },
  },
  plugins: [],
};
