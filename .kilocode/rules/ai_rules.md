# 🧠 AI Rules for Coding My Portfolio Website (React + Vite)

## 📌 General Project Context
- This is a **personal UI/UX designer portfolio website**.
- Built using **React + Vite**.
- Some pages are already implemented — all new components/pages must follow the **existing design language** and **visual consistency**.
- Styling is done with **CSS Modules or utility-first CSS (if specified)**.

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


### 3. 🌍 Accessibility & Semantics
- Use **semantic HTML elements** whenever possible.
- Add `alt` text for images, and `aria` attributes when appropriate.
- Headings should follow a **logical order** (`h1` to `h3`), especially for portfolio sections.

### 4. 📱 Responsive Design
- Desktop-first layout.
- Maintain consistent breakpoints as used in the existing project.


### 5. ✨ Animations (If Used)
- Subtle, clean animations (fade-ins, scale, hover effects) to match a designer’s polished portfolio.
- Follow what’s already used on existing pages (e.g., if using Framer Motion or CSS transitions).

### 6. 🧼 Clean Code
- Follow modern React best practices (hooks, fragments, etc.).
- No inline styles unless temporary.
- Always include meaningful comments only if logic is non-obvious.

### 7. 🔄 Reusability & Scalability
- When creating new layouts/sections, think of how they might be reused elsewhere in the project.
- Favor abstraction when there’s repetition (e.g., `ProjectCard`, `TestimonialBlock`, etc.).

---

## ✅ Bonus: AI Behavior Guidelines
- Don’t invent unrelated UI elements or features unless explicitly asked.
- If something is unclear (e.g., style, copy, layout), assume it follows the **existing pattern** in the project.
- Don’t overcomplicate the logic — this is a designer portfolio, not a web app backend.
- If unsure about style or layout, prefer **simple, elegant, and clean** over flashy.