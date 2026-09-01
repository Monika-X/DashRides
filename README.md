# ⚡ DashRides — Luxury Urban Scooter & Moped Rental Service

> **Awwwards / Behance-level Urban Mobility Experience** built with **HTML5, CSS3, and Vanilla JavaScript (ES6)**. Zero frameworks, pure performance.

---

## 🌟 Key Features

- **12 Unique Pages + Full Customer Dashboard** — Each page features 6 distinct, premium editorial sections.
- **Urban Luxury Design System**:
  - **Color Palette**: Obsidian `#111827`, Electric Lime `#B7D84B`, Burnt Orange `#D97745`, Bone `#F5F1E8`, Graphite `#374151`, Silver `#C8CDD2`.
  - **Typography**: Space Grotesk + Manrope.
- **Interactive UI/UX**:
  - ☀️/🌙 **Light & Dark Mode Toggle** with `localStorage` persistence.
  - 🔄 **RTL / LTR Layout Switcher** with full mirror support.
  - 🎛️ **Interactive Fare Calculator** with duration slider & dynamic live breakdown.
  - 🛵 **Fleet Showcase with Category Filters** & Quick Booking Flow.
  - ⏱️ **Active Rental Live Return Deadline Countdown & 1-Click Extension**.
  - 📄 **Tax-compliant PDF Receipt & Agreement Simulation Downloads**.
  - 💬 **Glassmorphism Reviews, FAQ Accordions, Toast Alerts, and Smooth Scroll Reveals**.
  - 📱 **100% Fully Responsive** across mobile, tablet, and ultra-wide displays.

---

## 📁 Project Structure

```
DashRides/
├── index.html              # Home 1 (Cinematic Showcase - Root Entry)
├── pages/                  # All secondary pages & customer portal
│   ├── home-2.html         # Home 2 (Editorial & Hub Map)
│   ├── about.html          # About Us (Mission, Team & Heritage)
│   ├── services.html       # Services & Rental Plans (Specs Matrix)
│   ├── blog.html           # Urban Journal Index
│   ├── blog-details.html   # Article Deep-Dive
│   ├── contact.html        # Contact, Lounges & Emergency Dispatch
│   ├── privacy-policy.html # Privacy Policy (GDPR & CCPA)
│   ├── terms.html          # Terms & Conditions (Rental Agreement)
│   ├── sitemap.html        # Complete HTML Sitemap Directory
│   ├── 404.html            # Interactive 404 Route Error Page
│   ├── maintenance.html    # Scheduled Maintenance & Live Countdown
│   └── dashboard.html      # Customer Dashboard Portal (9 Modules)
├── css/
│   ├── variables.css       # Design tokens, theme colors & typography
│   ├── reset.css           # Base reset, typography defaults & scrollbars
│   ├── components.css      # Sticky header, buttons, cards, toasts
│   ├── animations.css      # Keyframes, scroll reveals & infinite marquee
│   ├── pages.css           # Page layouts, bento grids, calculators
│   ├── dashboard.css       # Customer portal layout, tables, telemetry
│   └── responsive.css      # Breakpoints (320px, 640px, 992px, 1200px)
├── js/
│   ├── main.js             # Theme/RTL toggles, sticky navbar, mobile drawer
│   ├── hero-slider.js      # Cinematic hero slider with touch swipe
│   ├── scroll-reveal.js    # IntersectionObserver reveals & stat counters
│   ├── fleet.js            # Fleet filtering & quick-booking bridge
│   ├── pricing.js          # Interactive rental calculator
│   ├── booking.js          # Booking form validation & confirmation
│   ├── dashboard.js        # Tab switching, return timer, extensions
│   └── faq.js              # Accessible accordion & countdown timers
└── README.md
```

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or serve locally:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Navigate to `http://localhost:8080` to explore the experience.

---

## 📄 License
MIT License © 2026 DashRides Mobility Inc.
