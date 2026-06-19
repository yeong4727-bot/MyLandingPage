# AGENTS.md

VS Code Codex and other coding agents should follow these project rules when editing this repository.

## 1. Project Overview

- This is a web design and motion graphics portfolio site.
- The site is intended for employment, freelance inquiries, and portfolio presentation.
- The visual direction is black-based, minimal, premium, and work-focused.
- The aesthetic should feel close to Awwwards / Apple-style presentation: strong typography, confident spacing, and a clear focus on visual work.
- The project is currently a static HTML/CSS/JavaScript site, not a Next.js app.

## 2. Design Concept

- Use Black & White as the core visual language.
- Keep the mood refined, minimal, and premium.
- Favor large headings, generous whitespace, and layouts that make portfolio work the main focus.
- Avoid unnecessary decoration, busy backgrounds, novelty effects, or arbitrary visual flourishes.
- Use animations softly and deliberately. Motion should support polish and clarity, not distract from the work.
- Preserve the current design tone unless the user explicitly asks for a redesign.

## 3. Color Rules

- Backgrounds should stay in black and dark gray families, such as `#0b0b0c`, `#111113`, and `#171719`.
- Primary text should stay white or warm off-white, such as `#ffffff` and `#f4f0e8`.
- Secondary text should use light gray / muted gray, such as `#aaa49a`.
- Keep the existing accent colors unless the user explicitly requests a palette change:
  - Gold/coral accent: `#d8b56d`
  - Soft blue: `#8ea7ff`
  - Lime accent: `#d9ff75`
- Borders should usually use low-opacity light lines, for example `rgba(244, 240, 232, 0.14)`.
- Cards and panels should remain dark and restrained.
- Hover states should be subtle: slight movement, opacity changes, border changes, or restrained background shifts.
- Do not replace the palette with a new color system without user approval.

## 4. Typography Rules

- Headings should be large, bold, and direct.
- Body copy should prioritize readability and comfortable line height.
- Button text should be short, clear, and action-oriented.
- Avoid long explanatory UI text inside the app unless it already exists in the design.
- On mobile, always check text size, wrapping, and line height so headings and buttons do not overflow.
- Do not arbitrarily change the font stack or overall type personality.

## 5. Layout Rules

- Preserve the existing section spacing and visual rhythm.
- Keep the card-based layout for portfolio/work items.
- Preserve the current structure of:
  - Hero slider
  - AI video / motion reel section
  - `작업과정` section
  - Portfolio Gallery
  - Services section
  - About section
  - Contact section
- For the `작업과정` section, the three cards should keep their grid position. The detail panel belongs below the full card grid, not inserted between cards.
- For Portfolio Gallery, keep the mobile slider behavior and desktop grid behavior distinct.
- When fixing mobile issues, do not break desktop layout.
- Analyze the source of responsive layout bugs before editing. Prefer minimal, breakpoint-scoped fixes.

## 6. Folder Structure

Current project structure:

```text
/
├── assets/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── hero-slide-1.png
│   ├── hero-slide-2.png
│   ├── hero-slide-3.png
│   ├── img1.png
│   ├── mp4-1.mp4
│   ├── mp4-2-1.mp4
│   └── portfolio-collage.png
├── supabase/
│   └── profiles.sql
├── index.html
├── portfolio-detail.html
├── contact.html
├── contact.css
├── contact.js
├── login.html
├── signup.html
├── mobile-preview-1080x1920.html
├── README.md
├── PLAN.md
├── .gitignore
└── AGENTS.md
```

File and folder roles:

- `index.html`: Main portfolio page. Contains most of the site CSS and JavaScript inline.
- `portfolio-detail.html`: Portfolio detail page.
- `contact.html`: Contact/inquiry page.
- `contact.css`: Styles for the contact page.
- `contact.js`: Contact form validation behavior.
- `login.html`: Supabase Auth login page.
- `signup.html`: Supabase Auth signup page.
- `assets/`: Images, videos, favicon files, and OG sharing image.
- `supabase/profiles.sql`: Optional Supabase profile table and RLS setup for login/signup pages.
- `mobile-preview-1080x1920.html`: Mobile preview helper page.
- `README.md`: Project documentation for deployment and security notes.
- `PLAN.md`: Existing planning notes.

Removed/absent by design:

- No Next.js app structure should be assumed.
- No `package.json`, `next.config.mjs`, `app/`, `components/`, `lib/`, or `types/` are currently part of the active static site.
- The guestbook feature has been removed.

## 7. Development Rules

- Present a short plan before making changes when the user asks for one or when the change is non-trivial.
- Wait for user approval before editing if the user requested approval first.
- Modify only the files required for the task.
- Preserve the existing code style and visual design.
- Avoid unnecessary refactoring.
- Do not add libraries unless the user explicitly approves and the need is clear.
- Prefer small, focused fixes over broad rewrites.
- After finishing, report the changed files and summarize what changed.
- When relevant, run or describe checks:
  - local path/reference check for images, videos, CSS, and JS
  - manual browser refresh check
  - Vercel/static deployment readiness check
- For static preview, opening `index.html` in a browser is usually enough. If a local server is needed, use a simple static server.

## 8. Security Rules

- Never write a Supabase `service_role` key into browser code.
- Never hardcode API secrets, access tokens, passwords, database URLs, or GitHub tokens.
- Do not commit `.env`, `.env.local`, `.env.production`, or `.env.*`.
- Do not put real secrets in `.env.example`.
- Supabase anon/publishable keys can be public, but RLS policies must be checked before deployment.
- Personal data such as `email` and `phone` must not be publicly selectable through Supabase RLS.
- If editing `supabase/profiles.sql`, preserve the rule that users can read only their own profile.
- Username availability should be checked through the provided RPC approach, not by exposing the full `profiles` table.
- Run a security check before deployment when authentication, forms, Supabase, or deployment config changes.

## 9. Never Do

- Do not arbitrarily change the design concept.
- Do not arbitrarily change the color palette.
- Do not arbitrarily change the font style or typography personality.
- Do not break the desktop layout while fixing mobile issues.
- Do not remove existing animations unless the user explicitly asks.
- Do not remove existing features without user approval.
- Do not delete files without user approval.
- Do not make large structural changes without user approval.
- Do not change deployment settings without user approval.
- Do not put secret keys directly in code.
- Do not add image, video, CSS, or JavaScript paths that do not exist.
- Do not reintroduce the removed guestbook or Next.js app structure unless the user explicitly asks.
- Do not create `CLAUDE.md`; this project uses `AGENTS.md` for Codex-facing rules.
