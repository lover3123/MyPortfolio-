# Rohan Rajbanshi — The Morning Brief

A single-page portfolio website printed in the style of a daily newspaper — cream paper, warm ink,
and red stamp accents, with serif display type and monospace metadata. Built with plain HTML, CSS,
and JavaScript; no frameworks, no build step, ready to open or deploy anywhere.

The layout is *inspired by* the newspaper / “Morning Brief” aesthetic (e.g. roberttran.com.au) —
not a copy: different masthead, typefaces, layout, and content.

## ✨ Features

- **Masthead hero** — “The Morning Brief” rises word-by-word with a dateline, deck, and CTAs
- **Ticker** — a seamless scrolling strip of skills and roles under the masthead
- **Datelines** — every section opens with a mono uppercase dateline (“BENGALURU — ABOUT THE AUTHOR”)
- **Hairline rules** — section dividers that draw themselves in with a red stamp corner
- **Masked headline wipes** — serif section titles slide up word-by-word as they enter view
- **Exhibit cards** — print-style project cards with rotated red “Exhibit 01/02/03” stamps
- **Fact sheet** — a bordered card in the About section with role, degree, and focus
- **Scroll-reveal animations** — sections and cards fade up as you scroll (with stagger)
- **3D card tilt** — skill and contact cards tilt toward the cursor on desktop
- **Cursor glow** — a soft red-tinted light trails the pointer (desktop only)
- **Scroll progress bar** at the top of the page
- **Motion toggle** (bottom-left) — turn all animation on or off; the choice is remembered. The site respects your OS *reduce motion* setting by default, but the toggle lets you override it
- **Skills** index grid covering programming, design, and engineering
- **Record** section for education
- **Contact** cards for email, phone, GitHub, and LinkedIn
- **Sticky navigation** with smooth scrolling, active-section highlighting, and a mobile hamburger menu
- **Scroll-to-top** button
- **Reduced-motion support** — animations disable for users who prefer it
- **Fully responsive** — mobile, tablet, and desktop

## 🛠 Tech Stack

- HTML5
- CSS3 (custom properties, CSS Grid, Flexbox, media queries)
- Vanilla JavaScript (no dependencies)
- Google Fonts (Cormorant Garamond, Inter & JetBrains Mono)

## 📁 Project Structure

```
.
├── index.html          # Single-page portfolio markup
├── style.css           # All styles (design system + sections + responsive)
├── script.js           # Navigation, scroll-to-top, active link, footer year
├── assets/
│   └── images/         # Icons used by the page (favicon, email, phone)
└── README.md
```

## 🚀 Getting Started

The site is fully static — no installation or build required.

### Option 1: Open directly

Double-click `index.html` to open it in your browser.

### Option 2: Local server (recommended)

Serve the folder over HTTP so asset paths and fonts resolve exactly as they would in production:

```bash
# with Python
python -m http.server 8000

# with Node
npx serve .
```

Then visit <http://localhost:8000>.

## ✏️ Customization

- **Contact details:** replace the placeholder email and phone in the Contact section of
  `index.html` (look for the `TODO` comment).
- **Exhibits:** duplicate the `.exhibit` markup in `index.html` to add new projects.
- **Colors & fonts:** edit the design tokens at the top of `style.css` (`:root`).

## 🌐 Deployment

Any static host works — GitHub Pages, Netlify, Vercel, or a simple web server. Just push the
folder contents and point the host at the repository root.

---

© 2026 Rohan Rajbanshi · Designed & built with HTML, CSS & JavaScript
