# Akshit Sharma — Premium AI/ML Developer Portfolio

A production-grade, editorial dark-mode personal portfolio engineered with React 19, Framer Motion 12, Lucide Icons, and Vanilla CSS custom property design tokens. Inspired by cinematic, typography-driven aesthetics.

## Design Highlights
- **Palette**: Near-black (`#090909`), warm off-white (`#f2efeb`), vivid crimson accent (`#e32b3c`).
- **Typography**: Anton (Display titles), Manrope (Body prose), Caveat (Handwritten editorial accents).
- **Hero**: Typographic composition with abstract neural / agent graph motif (no portrait faked or generated).
- **Selected Work**: Interactive category filter, real-time query search, deep architectural modal breakdowns.
- **Motion System**: Smooth reveals with balanced timing. Persistent **Motion On/Off** toggle in the header and automatic compliance with `prefers-reduced-motion`.
- **Verified Facts Only**: 100% sourced from owner configuration—no fabricated testimonials, clients, or awards. Clean omission of all placeholders.

---

## Project Structure

```
Portfolio_website/
├── index.html                   # Semantic HTML5, SEO, Open Graph & JSON-LD Person schema
├── package.json                 # React 19, Framer Motion 12, Lucide React, Vite
├── vite.config.js               # Optimized Vite configuration
├── public/
│   └── favicon.svg              # Custom "AS" initials monogram in accent crimson
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Root state orchestration & motion toggle persistence
│   ├── styles.css               # Centralized design system & responsive layout tokens
│   ├── config/
│   │   └── site.js              # Single source of truth: identity, appearance, toggles
│   ├── data/
│   │   ├── projects.js          # Featured projects, summaries, and architecture steps
│   │   └── experience.js        # Timeline (LeadManch, Signity, OTA Gaya), education & awards
│   └── components/
│       ├── Header.jsx           # Sticky nav, brand badge, motion switch & accessible drawer
│       ├── Hero.jsx             # Typographic headline, verified metrics & status pill
│       ├── ProjectGrid.jsx      # Dynamic category filters & live keyword search
│       ├── ProjectCard.jsx      # Abstract architectural visual card & tech chips
│       ├── ProjectDialog.jsx    # Accessible modal with keyboard trap & deep breakdown
│       ├── About.jsx            # Military leadership + AI engineering background
│       ├── Skills.jsx           # Grouped capabilities & infrastructure strip
│       ├── Experience.jsx       # Career timeline & academic credentials
│       ├── Awards.jsx           # SIH 2025, Zinnovatio 3.0 & SSB Recommended
│       ├── Contact.jsx          # Direct email, phone, LinkedIn, Cal.com & form composer
│       ├── Footer.jsx           # Computed year, top scroll & verified links
│       └── ScrollProgress.jsx   # Top-of-page reading indicator
└── dist/                        # Production-ready static output
```

---

## Where to Edit Personal Details

All personal data is completely decoupled from UI presentation:

1. **Identity & Contact Details**:
   Edit `src/config/site.js`. To add your custom domain, GitHub, LeetCode, or Resume, update the corresponding fields. If left blank or containing `[PLACEHOLDER]`, the site will automatically omit the link cleanly with zero dead buttons.
2. **Projects & Architecture Steps**:
   Edit `src/data/projects.js` to modify or add projects, tools, and technical breakdowns.
3. **Experience, Education & Skills**:
   Edit `src/data/experience.js` to update roles, dates, academic degrees, and skill tags.

---

## Available Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Run production build
npm run build

# Verify build integrity
npm run check

# Preview production build locally (http://localhost:4173)
npm run preview
```

---

## Deployment Guide

The `dist/` directory produced by `npm run build` is 100% static and zero-dependency, deployable anywhere:

### 1. Deploying on Vercel
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel` in the project root.
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### 2. Deploying on Netlify
- Drag-and-drop the `dist` folder directly onto [Netlify Drop](https://app.netlify.com/drop)
- Or link your Git repository with:
  - Build command: `npm run build`
  - Publish directory: `dist`

### 3. Deploying on GitHub Pages
- Run `npm run build`
- Push the contents of the `dist/` directory to the `gh-pages` branch, or configure GitHub Actions with the official Vite deployment workflow.

