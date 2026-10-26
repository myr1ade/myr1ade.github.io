# Ananya Bongale — Editorial Portfolio

An animated, poster-style portfolio built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

---

## 1. Install

You need **Node.js 18 or newer** (download from nodejs.org). Then, in this folder:

```bash
npm install
```

## 2. Run it on your computer

```bash
npm run dev
```

Open the address it prints (usually http://localhost:5173). The page reloads by itself every time you save a file.

---

## 3. Edit your information — `src/data/portfolio.ts`

Almost everything you see on the site comes from this one file. Open it, change the text between the quotes, save.

| What | Where in the file |
|---|---|
| Name and red signature | `identity.name`, `identity.signature` |
| The giant cover word | `hero.headline` (one short word works best) |
| Date on the cover | `hero.dateLabel` |
| The four labels at the bottom of the cover | `hero.bottomLabels` |
| Biography | `about.introduction` |
| Education | `education.items` |
| Skills and tools | `toolbox.groups` |
| Engineering × Design lists | `twoSides` |
| Contact text, email, social links | `contact` |
| Footer year and tagline | `footer` |

Changing your name once updates the cover signature, navigation, mobile menu and footer automatically.

> Section headings are styled in lowercase on purpose, to match the cover. Type them however you like — the styling handles the case.

## 4. Add or replace project images

1. Put the image in `public/images/` — for example `public/images/ai-hub.jpg`. A landscape image around 1600×1200 px works best.
2. In `portfolio.ts`, find the project and set:
   ```ts
   image: "/images/ai-hub.jpg",
   imageAlt: "Home screen of the AI Hub concept",
   ```
If `image` is empty (or the file can't be found), a designed typographic placeholder appears instead — never a broken-image icon.

## 5. Add or remove projects

Each project in `projects.items` is one `{ ... }` block.

- **Add:** copy a whole block, paste it after the last one, give it a new `id`, and change its text.
- **Remove:** delete its whole block (including the comma after it).
- **Link:** set `link` to a real URL (e.g. a GitHub repo or Figma file). Leave it as `""` and no link is shown.
- **Year:** fill in `year` if you want it shown; leave `""` to hide it.

The numbers (01, 02, 03…) and the alternating left/right layout are automatic.

## 6. Contact & social links

```ts
email: "you@example.com",
socials: [
  { label: "GitHub", url: "https://github.com/your-name" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/your-name" },
  ...
]
```

Any link left as `""` is hidden. The **Get in touch** button opens your email if one is set, otherwise your first social link. If neither is set, the button stays hidden so there is never a dead control.

## 7. Colors and fonts

**Colors** — top of `src/index.css`:

```css
--paper: #e8e7df;   /* background */
--ink:   #151515;   /* black type */
--accent:#d83232;   /* red signature + small accents */
```

**Fonts** — the site uses Google Fonts, self-hosted through `@fontsource` (fast, private, works offline):

- Display: Montserrat (900) — the giant "portfolio" and headings
- Body: Inter
- Signature: Mrs Saint Delafield (Allura as a fallback)

To change one: `npm install @fontsource/<font-name>`, import it in `src/fonts.ts`, then update the matching `--font-display`, `--font-body` or `--font-script` line in `src/index.css`.

The size of the cover word is `--hl` in the "Hero poster" block of `src/index.css`; the signature size is `--sig`.

## 8. Animation settings — `src/config/settings.ts`

| Setting | What it does |
|---|---|
| `SHOW_INTRO` | `false` skips the ~1.2 s cover intro |
| `INTRO_DURATION` | Length of the intro in seconds |
| `SIGNATURE_PARALLAX_PX` | How far the signature drifts with the mouse (0 = off) |
| `MAGNETIC_STRENGTH` | Pull of the contact button toward the mouse (0 = off) |
| `EASE`, `REVEAL_DURATION` | Global easing and scroll-reveal speed |

Visitors whose device is set to *reduce motion* automatically get a still version: no intro, no parallax, all text shown immediately.

## 9. Deploy

```bash
npm run build
```

This creates a `dist/` folder — that's the whole website.

- **Netlify:** drag the `dist` folder onto app.netlify.com/drop. Done.
- **Vercel:** import the project from GitHub at vercel.com; it detects Vite automatically.
- **GitHub Pages (set up already):**
  1. Create an empty repository on github.com and push this folder to its `main` branch.
  2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
  3. Every push to `main` now rebuilds and publishes the site automatically (see the **Actions** tab).
     It appears at `https://<username>.github.io/<repo-name>/` — or at `https://<username>.github.io/`
     if the repository is named `<username>.github.io`.

Check the build locally first with `npm run preview`.

---

### Project structure

```
src/
  data/portfolio.ts        ← your content
  config/settings.ts       ← animation switches
  index.css                ← colors, fonts, paper texture
  fonts.ts                 ← font imports
  components/              ← one file per section + reusable pieces
    Hero, Navbar, Intro, About, Education, Skills, Projects,
    ProjectCard, CreativeProcess, Contact, Footer,
    Signature, TextReveal, Reveal, SectionLabel, MagneticButton
  hooks/                   ← reduced motion, active section, pointer type
public/images/             ← project images
```
