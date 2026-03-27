# Choose Your Runner - Design Guidelines

## Design Philosophy

The app should feel like a **sports matchup screen meets modern web app**. Think ESPN head-to-head graphics crossed with a fighting game character select — but rendered with clean, professional UI craft. The experience should make people smile and want to interact, while still feeling polished enough that you'd show it at work.

**Three pillars:**
1. **Fun first** — bold visuals, dynamic layout, personality in every interaction
2. **Clean craft** — consistent spacing, readable typography, professional finish
3. **Accessible always** — Designsystemet components ensure we never sacrifice usability for style

---

## Color Palette

### Primary Colors

The palette is built around energy and competition. Two distinct runner colors create the VS tension.

| Role | Color | Hex | Usage |
| --- | --- | --- | --- |
| Runner A | Electric Blue | `#2563EB` | Left panel background accent, Runner A highlights |
| Runner B | Fiery Red/Orange | `#E84D1A` | Right panel background accent, Runner B highlights |
| VS / Accent | Gold/Amber | `#F59E0B` | VS badge, winner highlights, call-to-action |
| Surface | Dark Slate | `#0F172A` | Main background for the matchup screen |
| Surface Light | Soft Gray | `#F1F5F9` | Cards, form backgrounds, result panels |
| Text Primary | Near Black | `#1E293B` | Body text on light surfaces |
| Text on Dark | White | `#F8FAFC` | Text on dark/colored surfaces |

### Gradients

Gradients add the game-inspired energy without being childish.

```css
/* Runner A panel */
--gradient-runner-a: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%);

/* Runner B panel */
--gradient-runner-b: linear-gradient(135deg, #9A3412 0%, #E84D1A 50%, #F97316 100%);

/* VS badge / winner glow */
--gradient-accent: linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%);

/* Main background */
--gradient-bg: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
```

### Designsystemet Theme

Use the Designsystemet theme builder (theme.designsystemet.no) to generate a custom theme with:
- Brand color: `#2563EB` (blue) as the base
- Neutral: Slate scale
- Border radius: `8px` (medium roundedness — friendly but not bubbly)

This ensures all form components (inputs, dropdowns, buttons) inherit a cohesive look.

---

## Typography

### Font Stack

| Use | Font | Fallback |
| --- | --- | --- |
| Headings / VS / Names | **Inter** (700, 800, 900) | system-ui, sans-serif |
| Body / Form labels | **Inter** (400, 500) | system-ui, sans-serif |
| Stats / Numbers | **Inter Tight** or tabular nums | monospace |

Inter is the Designsystemet default and works perfectly for both the clean UI elements and bold game-style headings.

### Type Scale

| Element | Size | Weight | Style |
| --- | --- | --- | --- |
| Page title ("Choose Your Runners") | 2.5rem / 40px | 900 (Black) | Uppercase, letter-spacing: 0.05em |
| VS badge | 3rem / 48px | 900 | Uppercase |
| Runner name | 1.5rem / 24px | 700 | Normal case |
| Section labels | 0.875rem / 14px | 600 | Uppercase, letter-spacing: 0.1em |
| Form labels | 0.875rem / 14px | 500 | Normal |
| Body text | 1rem / 16px | 400 | Normal |
| Result numbers (times) | 2rem / 32px | 700 | Tabular figures |
| Stat values | 1.25rem / 20px | 600 | Tabular figures |

### Heading Style

The main heading and VS text should feel **impactful**:
- Uppercase
- Extra bold (800-900)
- Slight letter-spacing
- Optional subtle text-shadow on dark backgrounds

```css
.heading-game {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

---

## Layout

### Split-Screen Matchup

The core layout is a **horizontal split** with three zones:

```
┌──────────────────────────────────────────────────┐
│              CHOOSE YOUR RUNNERS                 │
├────────────────┬──────┬─────────────────────────┤
│                │      │                          │
│   RUNNER A     │  VS  │     RUNNER B             │
│   [Avatar]     │      │     [Avatar]             │
│   [Form]       │      │     [Form]               │
│                │      │                          │
├────────────────┴──────┴─────────────────────────┤
│              ROUTE SETTINGS                      │
├─────────────────────────────────────────────────┤
│              [COMPARE BUTTON]                    │
├─────────────────────────────────────────────────┤
│              RESULTS                             │
└─────────────────────────────────────────────────┘
```

### Responsive Behavior

| Breakpoint | Layout |
| --- | --- |
| Desktop (≥1024px) | Side-by-side split-screen, full game layout |
| Tablet (768-1023px) | Side-by-side but tighter, smaller avatars |
| Mobile (<768px) | Stacked: Runner A on top, VS divider, Runner B below |

### Spacing System

Use Tailwind's default spacing scale. Key values:

| Context | Spacing |
| --- | --- |
| Page padding | `p-6` (24px) desktop, `p-4` (16px) mobile |
| Between sections | `gap-8` (32px) |
| Card internal padding | `p-5` (20px) |
| Between form fields | `gap-4` (16px) |
| Between label and input | `gap-1.5` (6px) |

---

## Components

### Runner Panel

Each runner lives in a panel with a colored gradient at the top fading into a light card.

```
┌─────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Gradient header (Runner color)
│     [Runner Avatar]     │
│      Runner Name        │
│ ─────────────────────── │
│  Name:  [___________]   │  ← Designsystemet Textfield
│  Age:   [___________]   │  ← Designsystemet Textfield
│  Level: [▼ Regular  ]   │  ← Designsystemet Select
└─────────────────────────┘
```

**Styling:**
- `rounded-xl` (12px border radius)
- Subtle shadow: `shadow-lg`
- Gradient top section: ~120px for avatar area
- White/light card body for the form
- Slight hover lift: `hover:-translate-y-1 transition-transform`

### VS Badge

The center VS element is a key personality piece.

- Circular badge: `w-16 h-16` with gold/amber gradient
- Bold "VS" text in white, weight 900
- Subtle glow/shadow: `shadow-[0_0_20px_rgba(245,158,11,0.4)]`
- Slight pulse or scale animation on hover

### Route Settings

- Sits in a neutral card below the runner panels
- Uses Designsystemet form components
- Two fields side by side: Distance (km) + Elevation gain (m)
- Clean, understated — doesn't compete with the runner panels

### Compare Button

The primary call-to-action.

- Full width within its container or centered, generous padding
- Gold/amber gradient background (matches VS badge)
- Dark text, weight 700, uppercase
- Rounded: `rounded-lg`
- Hover: slight scale-up + brighter glow
- Active/loading: pulsing animation

```
┌─────────────────────────────────┐
│          ⚡ COMPARE ⚡           │
└─────────────────────────────────┘
```

### Result Display

After comparison, results appear with drama.

- Slide-in or fade-up animation on appear
- Two stat cards side by side (Runner A time, Runner B time)
- Large time numbers in each runner's color
- Center: time difference with winner highlighted
- Summary text below in a callout/badge style

```
┌──────────────┐         ┌──────────────┐
│  24:30       │  2:45   │  27:15       │
│  4:42/km     │ faster  │  5:14/km     │
│  ★ WINNER    │         │              │
└──────────────┘         └──────────────┘
  "Kari is about 2-3 minutes faster on this leg"
```

---

## Animation & Motion

Animation makes it feel like a game. Keep it snappy — never slow.

| Element | Animation | Duration |
| --- | --- | --- |
| Page load | Runner panels slide in from sides | 400ms ease-out |
| VS badge | Scale pop-in after panels land | 200ms |
| Runner avatar | Subtle idle bounce or sway | Continuous, gentle |
| Avatar reacts to input | Quick scale/morph on setting change | 200ms |
| Compare button hover | Scale up 1.05x + glow intensifies | 150ms |
| Results appear | Slide up + fade in | 300ms ease-out |
| Winner highlight | Gold glow pulse (2 cycles) | 600ms |

**Motion principles:**
- **Snappy, not sluggish** — nothing over 400ms
- **Purposeful** — every animation communicates something (entry, reaction, result)
- **Interruptible** — user actions always feel instant, animations don't block interaction
- Use `prefers-reduced-motion` to disable non-essential animation

---

## Runner Avatar Guidelines

The avatar area is a placeholder in MVP but should be designed for future expansion.

### MVP (Phase 1)
- Stylized silhouette or simple illustrated runner icon
- Changes color/opacity based on training level
- Could use a simple SVG with CSS-driven variations:
  - Untrained: relaxed pose, muted colors
  - Peak: dynamic/powerful pose, vibrant colors, subtle glow

### Future (Phase 2+)
- Illustrated characters with distinct visual traits
- Animated idle states
- React to age + training combination

### Important art direction rules
- Older runners must **not** look weak or frail
- Training level should be the **dominant visual signal** — a trained 55-year-old looks powerful
- Tone is respectful and empowering, never mocking
- Style should be stylized/illustrative, not realistic

---

## Designsystemet Usage

Use Designsystemet components for all **form and data elements**. Use custom Tailwind styling for the **game-inspired layout and visuals**.

| Use Designsystemet for | Use Tailwind for |
| --- | --- |
| Text inputs | Split-screen layout |
| Select / dropdown | Gradient backgrounds |
| Buttons (secondary/form) | VS badge |
| Cards (as base) | Runner panel headers |
| Radio / toggle groups | Animations and transitions |
| Error messages | Result stat displays |
| Labels and help text | Page title / headings |
| | Compare CTA button |

Wrap Designsystemet components in custom-styled containers to blend them into the game aesthetic. The components provide accessibility and interaction quality; Tailwind provides the visual identity.

---

## Dark Mode

The matchup screen itself is **dark by default** (dark slate background with colored panels). This gives it the game/sports broadcast feel.

Form areas and result panels use **light surfaces** for readability and contrast.

No separate dark mode toggle needed for MVP — the design naturally mixes dark (stage) and light (content) zones.

---

## Do's and Don'ts

### Do
- Use bold colors and gradients for energy
- Make the VS element feel dramatic
- Add micro-animations that reward interaction
- Keep form areas clean, readable, and accessible
- Use uppercase + heavy weight for game-style headings
- Make the winner result feel exciting

### Don't
- Use neon colors or flashing effects (premium, not arcade)
- Add sound effects or auto-playing media
- Use comic-style fonts or pixel art (modern, not retro)
- Make the UI feel cluttered — whitespace is premium
- Sacrifice readability for visual flair
- Make any runner profile look negative or mocking
