# CACN Landing Page v2 — Design Update Instructions

> **Source of truth**: Citics Mortgages LP (`Mortgages - LP/`)
> **Target**: CACN Landing Page v2 (`CACN - Landing Page v2/docs/`)
> **Goal**: Bring CACN's visual design in line with the Mortgages LP style — same brand, elevated execution.

---

## Tech Context

| | Mortgages LP | CACN LP v2 |
|---|---|---|
| Stack | Next.js 15 + React 19 | Static HTML/CSS/JS |
| CSS | `src/app/globals.css` (pure CSS) | `docs/style.css` (pure CSS) |
| JS | `src/components/ClientEffects.tsx` | `docs/main.js` |
| Build | `next build && next export` | None (GitHub Pages) |

Both projects use **pure CSS with custom properties** — no Tailwind, no CSS framework. The design patterns translate directly; no framework migration needed.

---

## 1. CSS Variables — Align Tokens

CACN already has most tokens. Verify and add any missing:

```css
:root {
  /* ── Colors (should match) ── */
  --blue: #0741DA;
  --blue-dark: #0335B0;
  --amber: #FFBF01;
  --turquoise: #11DAEF;
  --black: #000000;
  --white: #FFFFFF;
  --lavender-light: #F0F4FD;
  --gray-100: #F5F7FA;
  --gray-200: #E2E5EB;
  --gray-600: #6B7280;

  /* ── Spacing (update if different) ── */
  --safe-zone: 50px;        /* Desktop */
  --nav-height: 72px;       /* Desktop */
  --btn-radius: 50px;       /* Pill buttons */
  --card-radius: 20px;      /* All cards & containers */

  /* ── Transition (standardize) ── */
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* ── Mobile overrides ── */
  /* --safe-zone: 16px at ≤1024px */
  /* --nav-height: 60px at ≤1024px */
}
```

**Action**: Diff CACN's `:root` against these values. Add missing, correct mismatched.

---

## 2. Typography — Tighten Hierarchy

### What changed in Mortgages LP

| Element | Mortgages LP | Check CACN |
|---|---|---|
| Hero headline | `clamp(36px, 5.5vw, 64px)` weight 900, line-height 1.1 | Match size + weight |
| Section title | `clamp(26px, 3.5vw, 42px)` weight 800, letter-spacing -0.5px | Likely needs update |
| Card title | 22px weight 800 | Check consistency |
| Body | 16px weight 400, line-height 1.6 | Should match |
| Section label | 12px weight 700, letter-spacing 2.5px, uppercase | Match exactly |
| Mobile section title | `clamp(28px, 8vw, 38px)` | Update breakpoint |

### Key rules
- Headlines use **weight 900** (not 700 or 800)
- Section titles use **weight 800** with **-0.5px letter-spacing**
- Labels are always **12px uppercase** with **2.5px letter-spacing**
- Line heights: headlines 1.1–1.2, body 1.6–1.7

**Action**: Update CACN's typography to match these scales. Pay attention to `clamp()` usage for fluid sizing.

---

## 3. Button System — Unify

### .btn base
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 50px;
  border: 2px solid transparent;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: background var(--transition), border var(--transition),
              transform var(--transition), box-shadow var(--transition);
}
```

### .btn-amber (Primary CTA)
```css
.btn-amber {
  background: var(--amber);
  color: var(--blue);
  border-color: var(--amber);
}
.btn-amber:hover {
  background: #ffcc33;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 191, 1, 0.4);
}
.btn-amber:active {
  background: #e6ab00;
  transform: translateY(0);
}
```

### .btn-ghost (Secondary on dark)
```css
.btn-ghost {
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.5);
}
.btn-ghost:hover {
  border-color: var(--white);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
```

### Size variants
```css
.btn-lg { font-size: 16px; padding: 16px 36px; }
.btn-full { width: 100%; justify-content: center; }
```

**Action**: Replace CACN's `.btn-primary`/`.btn-secondary` with `.btn-amber`/`.btn-ghost` system. Ensure all CTAs use amber.

---

## 4. Card System — Upgrade Visual Quality

### USP Cards (5 unique decorative variants)

The Mortgages LP USP cards use **organic blob shapes** via `::before`/`::after` pseudo-elements. Each card has a unique decorative shape.

```css
.usp-card {
  background: var(--blue);
  color: var(--white);
  padding: 24px;
  min-height: 280px;
  border-radius: var(--card-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}
.usp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(7, 65, 218, 0.35);
}
```

**Decorative blob example (Card 1)**:
```css
.usp-card:nth-child(1)::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -15%;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 58% 42% 32% 68% / 63% 32% 68% 37%;
  background: linear-gradient(135deg, rgba(255,191,1,0.18), rgba(17,218,239,0.10));
  box-shadow: inset 0 0 30px rgba(255,191,1,0.1);
  transform: rotate(-10deg);
}
```

Each of the 5 cards has different blob `border-radius` values and gradient colors. See Mortgages LP `globals.css` for all 5 variants.

**Action**: Copy the full USP card blob system from Mortgages LP. Each card gets a unique decorative shape.

### Pain Cards (Glassmorphism on dark)
```css
.pain-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--card-radius);
  padding: 28px;
  transition: transform var(--transition), border var(--transition),
              box-shadow var(--transition);
}
.pain-card:hover {
  transform: translateY(-3px) scale(1.03);
  border-color: rgba(255, 191, 1, 0.25);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}
```

### Policy Cards (Glassmorphism on gradient)
```css
.policy-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--card-radius);
  padding: 32px 24px;
  text-align: center;
}
.policy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}
```

**Action**: Apply glassmorphism (`backdrop-filter: blur` + rgba backgrounds + translucent borders) to cards on dark/gradient sections.

---

## 5. Section Backgrounds — Match Gradient System

### Hero + EForm area
```css
background: linear-gradient(160deg, #0335B0 0%, #0741DA 40%, #0952F5 100%);
```

### Painpoints section
```css
background: #0335B0;
```

### Policies section
```css
background: linear-gradient(200deg, #0952F5 0%, #0741DA 50%, #0335B0 100%);
```

### Personas section
```css
background: #DDE4F5;
```

### Solutions section
```css
background: #F8F9FB;
```

**Action**: Match section backgrounds. The key upgrade is using **multi-stop gradients** instead of flat colors for blue sections.

---

## 6. Shadow System — More Layered

### Standardize shadows
```css
/* Light (default card) */
box-shadow: 0 2px 10px rgba(7, 65, 218, 0.07);

/* Medium (hover state) */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

/* Card elevated */
box-shadow: 0 20px 60px rgba(7, 65, 218, 0.22);

/* Heavy (active/focused) */
box-shadow: 0 32px 80px rgba(7, 65, 218, 0.32);

/* Nav scrolled */
box-shadow: 0 2px 24px rgba(0, 0, 0, 0.15);
```

Key change: shadows use **blue-tinted rgba** (`rgba(7, 65, 218, ...)`) instead of pure black. This makes shadows feel on-brand.

**Action**: Replace all `rgba(0,0,0,...)` shadows with blue-tinted variants where appropriate.

---

## 7. Hover & Animation Upgrades

### Card hover pattern (universal)
```css
/* Before (CACN typical) */
:hover { box-shadow: ...; }

/* After (Mortgages LP standard) */
:hover {
  transform: translateY(-4px);  /* or -6px for emphasis */
  box-shadow: 0 12px 32px rgba(7, 65, 218, 0.15);
}
```

Every interactive card should **lift** on hover (`translateY`) plus **shadow expand**.

### Scroll reveal (upgrade timing)
```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
/* Staggered delays */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
```

### Icon pop animation (for bento/solution cards)
```css
@keyframes icon-pop {
  0%   { transform: scale(0.3); opacity: 0; }
  60%  { transform: scale(1.25); opacity: 1; }
  100% { transform: scale(1); }
}
/* Trigger: add class when card enters viewport */
```

### CountUp animation (stats/achievements)
```
Duration: 2000ms for large numbers (5000+), 1400ms for smaller
Easing: easeOutQuart
Format: locale separator (e.g., "12.500" using de-DE format)
Trigger: IntersectionObserver threshold 0.5
```

**Action**: Add `translateY` lift to all card hovers. Add staggered reveal delays. Add icon-pop animation to feature cards.

---

## 8. Glass Divider Between Sections

New visual element in Mortgages LP — a frosted glass divider between Hero and next section:

```css
.glass-divider {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
}
.glass-divider::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 8px;
}
```

**Action**: Add glass dividers between key section transitions (Hero→Content, Content→CTA).

---

## 9. Navigation — Scroll Enhancement

### Scrolled state upgrade
```css
.nav.scrolled {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.15);
}
```

### Active link indicator
```css
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--amber);
  border-radius: 1px;
}
```

### Scroll progress bar (top of page)
```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--amber);
  box-shadow: 0 0 8px rgba(255, 191, 1, 0.6);
  z-index: 9999;
  transition: width 0.1s linear;
}
```

**Action**: Add scroll progress bar. Enhance nav scrolled state with backdrop blur. Add amber active link indicator.

---

## 10. Form Styling — Modernize Inputs

```css
.form-group input,
.form-group select {
  font-size: 15px;
  padding: 13px 16px;
  border: 1.5px solid var(--gray-200);
  border-radius: 12px;
  background: var(--white);
  transition: border var(--transition), box-shadow var(--transition);
  -webkit-appearance: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(7, 65, 218, 0.12);
  outline: none;
}

/* Error state */
.form-group.error input {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
```

Key changes:
- Border radius **12px** (not square or fully rounded)
- Focus ring uses **blue glow** (3px spread)
- Border width **1.5px** (slightly thicker than 1px)

**Action**: Update form input styling. Match focus ring color and radius.

---

## 11. Mobile-Specific Upgrades

### Sticky CTA bar (mobile only)
```css
@media (max-width: 1024px) {
  .sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px var(--safe-zone);
    background: var(--white);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    z-index: 900;
  }
}
```

### Hamburger animation (3-line to X)
```css
.hamburger.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translateY(7px);
}
.hamburger.open .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-7px);
}
```

### Mobile menu overlay
```css
.nav-mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(7, 65, 218, 0.97);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding-top: 80px;
  transform: translateY(-100%);
  transition: transform 0.35s ease;
}
.nav-mobile-menu.open {
  transform: translateY(0);
}
```

**Action**: Add sticky CTA bar on mobile. Upgrade hamburger animation. Add backdrop blur to mobile menu.

---

## 12. Grain Overlay — Subtle Texture

```css
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* fractal noise SVG */
  background-repeat: repeat;
  z-index: 1;
}
```

Apply `.grain` class to sections with solid/gradient backgrounds (Hero, Painpoints, Policies).

**Action**: If CACN doesn't have the grain overlay, copy the SVG noise pattern from Mortgages LP's CSS.

---

## 13. Responsive Breakpoints — Standardize

```
≤480px  — Small phones (tighten spacing, single column everything)
≤768px  — Phones (standard mobile layout)
≤1024px — Tablets (2-column grids, mobile nav)
>1024px — Desktop (full layout)
```

Key mobile rules:
- `overflow-x: hidden` on `html, body`
- Minimum touch target: **48px** height
- Form inputs: **16px** minimum font-size (prevents iOS zoom)
- Safe zone: **16px** horizontal padding

**Action**: Verify CACN uses the same breakpoints. Standardize safe-zone and touch targets.

---

## Implementation Priority

### Phase 1 — Quick Wins (Visual Impact)
1. [ ] CSS variables alignment
2. [ ] Button system (`.btn-amber` / `.btn-ghost`)
3. [ ] Section background gradients
4. [ ] Shadow system (blue-tinted)
5. [ ] Scroll progress bar

### Phase 2 — Card & Component Upgrades
6. [ ] USP card blob decorations
7. [ ] Glassmorphism on dark-section cards
8. [ ] Form input modernization
9. [ ] Glass dividers between sections
10. [ ] Hover lift animations (`translateY`)

### Phase 3 — Animation & Polish
11. [ ] Staggered scroll reveal delays
12. [ ] Icon-pop animation on feature cards
13. [ ] CountUp animation upgrade
14. [ ] Grain overlay on gradient sections
15. [ ] Mobile sticky CTA bar

### Phase 4 — Navigation & Mobile
16. [ ] Nav scroll state (backdrop blur)
17. [ ] Active link amber indicator
18. [ ] Hamburger open/close animation
19. [ ] Mobile menu backdrop blur overlay

---

## Reference Files

| What | Where |
|---|---|
| Mortgages CSS (source of truth) | `Mortgages - LP/src/app/globals.css` |
| Mortgages page structure | `Mortgages - LP/src/app/page.tsx` |
| Mortgages client effects (JS) | `Mortgages - LP/src/components/ClientEffects.tsx` |
| CACN CSS (target to update) | `CACN - Landing Page v2/docs/style.css` |
| CACN HTML (target) | `CACN - Landing Page v2/docs/index.html` |
| CACN JS (target) | `CACN - Landing Page v2/docs/main.js` |
| Brand tokens | `Mortgages - LP/SKILLS/brand-guidelines/Citics-Brandguideline.md` |

---

*Generated from Citics Mortgages LP design analysis — 2026-03-28*
