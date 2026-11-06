# UI/UX Audit & Redesign Plan

Audit of the portfolio as it stood at commit `3918d11`, checked live at 1440, 1024 and 375 px in dark and light themes.

---

## 1. Findings

Severity: **High** = broken or failing accessibility, **Med** = hurts clarity or polish, **Low** = refinement.

### Layout & information architecture

| # | Sev | Finding |
|---|-----|---------|
| 1 | High | **Header overflows between 801 and 1199 px.** The full desktop nav (8 links plus 4 actions) needs about 1,160 px. At 1024 px the page scrolls horizontally (1,122 px wide), the Resume button is clipped, and labels wrap ("Hire / Me", "Side / Hustles"). |
| 2 | High | **Section order doesn't match the nav, and the numbering is broken.** The nav goes Work → Hire Me, but the page goes Hire Me → Work. Section numbers read 02, 01, 02, 03, 04, 05, 06, 06. *Resolved: per your decision, the page keeps Hire Me → Work, the nav now follows page order, and numbers come from a CSS counter.* |
| 3 | Med | **Orphaned grid items at desktop.** Services shows 3 cards + 1 alone on its own row, Projects 3 + 2, Awards 3 + 2. Each leaves a ragged hole. |
| 4 | Med | **Too many hero CTAs.** Four equal-weight buttons plus a location sit in one row, and the primary is Upwork-green. On mobile they stack into four full-width buttons, about 220 px of buttons. |
| 5 | Med | **Excessive vertical rhythm.** 140 px top and bottom padding per section plus dividers makes the page about 12,000 px on desktop and 20,000 px on mobile. |
| 6 | Med | **Venture cards leave large empty voids.** The highlight lists are pinned to the card bottom, so the two shorter cards open big gaps. |
| 7 | Low | Project cards show the title twice: in the poster banner and again as the card heading. The banner title also collides with its glyph at some widths. |

### Color

| # | Sev | Finding |
|---|-----|---------|
| 8 | High | **`--text-dim` (#605d5b) is about 2.8:1 on cards**, below WCAG AA (4.5:1). It's used for readable copy: venture descriptions, metric details, project roles, footer text. In light mode, `#78716c` is borderline at about 4.4:1. |
| 9 | High | **The brand colors clash.** The primary hero CTA is Upwork green `#14a800` against a crimson brand. That's a red/green complementary clash and unfriendly to colorblind visitors. WhatsApp green, emerald, blue and amber also compete, so six or more hues are in play. |
| 10 | Med | **The crimson accent is overused.** Red shows up on specialty chips, category badges, award badges, timeline dates, degrees, link pills, icons, dividers and form errors. When everything is red nothing stands out, and red also reads as "error". |
| 11 | Med | **Hard-coded colors in JSX break light mode.** Project and venture SVGs use `#f2efeb` or `rgba(255,255,255,…)` strokes, which disappear on the light theme. |
| 12 | Med | **Theme flash.** `<html class="dark">` is hard-coded, so light-theme visitors see a dark flash before React mounts. |

### Typography

| # | Sev | Finding |
|---|-----|---------|
| 13 | Med | The condensed, all-caps display face (Anton) is used on long card titles such as *"HACK-O-OCTO 4.0: TOP 10 NATIONAL FINALIST"*. That's hard to read at 1.35 rem. |
| 14 | Med | There are 12+ ad-hoc small sizes (0.68, 0.7, 0.72, 0.74, 0.75, 0.76, 0.78, 0.8, 0.82 rem…) and no scale. |
| 15 | Low | There's no monospace voice for a *developer* portfolio. A few places fall back to the generic `monospace`, which renders as Courier New on Windows. |

### Motion & interaction

| # | Sev | Finding |
|---|-----|---------|
| 16 | High | **The header "Motion" button launches 24 animated cursors.** The label suggests a motion toggle, so a motion-sensitive visitor looking for "less motion" gets the opposite. |
| 17 | Med | Every element uses the same fade-up with `blur(4px)`. That's monotonous, and blur filters on large text are expensive on mobile GPUs. |
| 18 | Med | There's no entrance choreography: the hero just fades in, with no sense of arrival. |
| 19 | Med | Hover lift is defined twice, once in CSS (`translateY(-4px)`) and once in Framer (`y: -6`), with conflicting values. |
| 20 | Low | The project-card mouse position (`--card-mouse-x/y`) is computed on every move but never used in CSS. |

### Performance & accessibility

| # | Sev | Finding |
|---|-----|---------|
| 21 | Med | Four full-viewport layers carry `filter: blur(140px)` and infinite animations, for gradients that are already soft. That's costly compositing for no visible gain. |
| 22 | Med | `CursorGlow` calls React `setState` on every `mousemove`, so it re-renders at 60+ fps. |
| 23 | Low | The project filter uses `role="tab"` without tab panels or arrow-key support. Plain toggle buttons with `aria-pressed` are the correct pattern. |
| 24 | Low | The reduced-motion preference is saved on the first visit and then overrides later OS changes. |
| 25 | Low | Copy: the form note addresses the owner (*"You will receive all inquiries in your Gmail inbox"*), and the footer lists "Hire on Upwork" twice. |

---

## 2. Design direction

Keep the identity: near-black, warm off-white, crimson, and Anton for display type. Give it the discipline of a developer's tool.

* **The accent is a signal, not a paint.** Crimson is reserved for the primary CTA, key words, active states and focus. Chips, badges and dates go neutral.
* **One semantic "live" color.** Emerald is used only for *available / live / ok* states.
* **A monospace voice.** JetBrains Mono for meta: section indices, tags, dates, labels and the preloader. Anton stays for headlines; Manrope for reading.
* **Motion with intent.** A boot sequence hands off to a choreographed hero, headings rise from a mask, the timeline draws as you scroll, and cards respond to the cursor. All of it is off under reduced motion.

---

## 3. Plan

**Phase 1: Foundation (color, type, layout)**
1. Tokens: contrast-safe text ramp, `--accent-text`, a `--signal` emerald, `--font-mono`, a small type scale.
2. Accent discipline: neutral mono chips and badges, brand-crimson primary CTA (Upwork stays as the label, not the color).
3. Header: collapse to the menu below 1200 px, no wrapping labels, and add a real Motion on/off toggle (pause icon, `aria-pressed`, saved only when clicked). The swarm button keeps its "Motion" label because your spec names it that; renaming it is still an open question.
4. Information architecture: keep the page order Hire Me → Work → About… (your call) and make the nav follow it. Section numbers are generated by CSS counters, so they're always sequential and skip any hidden section.
5. Grids: 4-up Services, "bento" quantity queries for Projects and Awards (no orphans at any filter count), Venture card flow.
6. Rhythm: tighter section padding, display face only for short titles.
7. Light mode: SVG artwork uses `currentColor` and theme tokens, and the theme is set before first paint.
8. Performance: drop the blur filters on the background orbs; make the cursor glow run on refs and requestAnimationFrame.

**Phase 2: Scroll and interaction motion**
1. Lighter reveal variants (no blur) on a shared easing.
2. `SplitReveal`: section headings rise word by word from a mask.
3. Hero choreography after the preloader: the name rises letter by letter, then the headline words, chips, CTAs and metrics.
4. Scroll-linked experience timeline that draws as you read.
5. Project cards in a code-window frame with a cursor spotlight.
6. An animated agent-graph motif in the hero (orbit, pulse, flowing edges).

**Phase 3: Developer preloader**
1. A terminal "boot" sequence: `python -m portfolio --serve`, then `[ OK ]` steps for the real stack (LangGraph, ChromaDB, Redis, FastAPI), a percent counter, and "Ready in X s".
2. It's painted from `index.html` before JavaScript loads, so there's no blank flash, and React then takes over seamlessly.
3. It waits for the web fonts (so the hero doesn't flash a fallback face), with a 3.5 s cap.
4. It shows once per browser session, can be skipped (button, Esc or Enter), and is skipped entirely under `prefers-reduced-motion`.
5. On exit it lifts like a curtain and hands off to the hero entrance.

**Phase 4: QA**
Desktop, laptop (1024), mobile (375), dark and light themes, reduced motion, and a production build.

---

## 4. Not done (suggested follow-ups)

* Consolidate the 4.5k-line stylesheet: there are three duplicated light-theme selector forms and unused legacy classes.
* Add real project screenshots or GIFs to the cards. Abstract glyphs are a stopgap.
* Add a focus trap to the mobile drawer and project dialog (focus currently only lands on the close button).
