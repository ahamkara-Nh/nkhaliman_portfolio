# 🧠 AI Rules for Coding My Portfolio Website (React + Vite)

## 📌 General Project Context
- This is a **personal UI/UX designer portfolio website**.
- Built using **React + Vite**.
- **Dark mode only** - the entire website operates in dark theme with carefully curated color palette.
- Some pages are already implemented — all new components/pages must follow the **existing design language** and **visual consistency**.
- Styling is done with **CSS Modules or utility-first CSS (if specified)**.

---

## 🎨 Color Palette & Design System
- **Primary colors** are defined in `styles.css` root variables - always reference these existing colors:
  - Background: `--bg-color`
  - Text: `--text-color`, `--text-secondary`
  - Accent: `--accent-color`, `--accent-secondary`
  - UI elements: `--border-color`, `--hover-color`
- **Never introduce new colors** without checking existing palette first
- **Read existing project files** to understand current styling patterns and component structure
- **Be creative with UI elements** - don't hesitate to design and implement additional visual elements even when not explicitly specified

---

## ✅ Rules to Always Follow

### 1. 🏷️ Unique CSS Class Naming
- Always generate **unique, descriptive, and scoped** CSS class names.
- Prefer format: `componentName__elementName__modifier` or `page-section__element`, depending on context.
- Avoid generic names like `container`, `button`, `box`, `text`, etc., unless they are **clearly scoped or local**.
- If using CSS Modules, follow `camelCase` naming.

### 2. 🎨 Design Consistency
- Match the **look & feel, layout structure, color palette, typography, and spacing** of existing pages.
- Reuse **existing components and styles** where possible (e.g., shared buttons, cards, sections).
- If a style or component is reused, assume it is **importable** (e.g., from `components/ui/Button.jsx`).
- **Dark mode first** - all designs should look polished and intentional in dark theme

### 3. 🌍 Accessibility & Semantics
- Use **semantic HTML elements** whenever possible.
- Add `alt` text for images, and `aria` attributes when appropriate.
- Headings should follow a **logical order** (`h1` to `h3`), especially for portfolio sections.

### 4. 📱 Responsive Design
- Desktop-first layout.
- Maintain consistent breakpoints as used in the existing project.

### 5. ✨ Animations & Micro-interactions
- Subtle, clean animations (fade-ins, scale, hover effects) to match a designer’s polished portfolio.
- Follow what’s already used on existing pages (e.g., if using Framer Motion or CSS transitions).
- **Creative hover states** and **micro-interactions** are encouraged for enhanced user experience

### 6. 🧼 Clean Code
- Follow modern React best practices (hooks, fragments, etc.).
- No inline styles unless temporary.
- Always include meaningful comments only if logic is non-obvious.

### 7. 🔄 Reusability & Scalability
- When creating new layouts/sections, think of how they might be reused elsewhere in the project.
- Favor abstraction when there’s repetition (e.g., `ProjectCard`, `TestimonialBlock`, etc.).

---

## 🚀 Creative Guidelines
- **Trust your design instincts** - create polished, professional UI elements that fit the dark theme aesthetic
- **Explore creative layouts** - use modern CSS techniques like grid, flexbox, and transforms for dynamic presentations
- **Add visual flair** - gradients, shadows, and subtle animations that enhance the dark mode experience
- **Think like a UI/UX designer** - every element should serve both function and aesthetic purpose

---

## ✅ Bonus: AI Behavior Guidelines
- **Be proactive in UI design** - create additional visual elements, sections, or components that enhance the portfolio
- **Reference existing patterns** - always check current project structure and styling before creating new elements
- **Dark mode expertise** - ensure all new elements look exceptional in dark theme with proper contrast and visual hierarchy
- **Polish over perfection** - prefer elegant, finished-looking designs over complex implementations
- **If unsure about style or layout, prefer creative interpretation over asking** - this is a designer portfolio, so aesthetic judgment is valued