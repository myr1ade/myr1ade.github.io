import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths, so the built site works at any address —
  // including GitHub Pages' https://<username>.github.io/<repo-name>/
  base: "./",
});
