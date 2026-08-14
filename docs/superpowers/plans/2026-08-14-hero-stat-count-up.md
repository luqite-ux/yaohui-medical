# Hero Stat Count-Up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the four homepage hero statistics once when they enter the viewport without layout shift or accessibility regressions.

**Architecture:** Store explicit animation metadata alongside each final hero statistic. A small client component owns viewport observation and frame updates, while pure formatting helpers remain independently testable.

**Tech Stack:** Next.js 16, React 19, TypeScript, IntersectionObserver, requestAnimationFrame, Node test runner, Playwright CLI.

## Global Constraints

- Duration is approximately 1.2 seconds with ease-out progression.
- Final strings remain `2010`, `600,000 rolls`, `4,000+ m²`, and `ISO 13485`.
- Animation runs once per page load when the grid enters the viewport.
- `prefers-reduced-motion: reduce` renders final values immediately.
- Numeric width is reserved to prevent card layout shift.

---

### Task 1: Count-Up Formatting Model

**Files:**
- Create: `lib/stat-animation.mjs`
- Create: `tests/stat-animation.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `formatAnimatedStat(value, prefix, suffix)` and `easeOutCubic(progress)`.

- [ ] Write tests asserting thousands separators, stable prefix/suffix composition, and ease-out endpoints.
- [ ] Run `node --test tests/stat-animation.test.mjs` and confirm it fails because the module is absent.
- [ ] Implement the two pure helpers with clamped progress and rounded integer output.
- [ ] Add the new test file to the existing `npm test` command and confirm all tests pass.

### Task 2: Accessible Viewport Animation Component

**Files:**
- Create: `components/animated-stat-value.tsx`
- Modify: `lib/site-data.ts`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/site-rules.test.mjs`

**Interfaces:**
- Consumes: `{ start, end, prefix, suffix, duration, finalValue }` metadata.
- Produces: `<AnimatedStatValue stat={stat} />` with final-value `aria-label` and a visual `aria-hidden` number.

- [ ] Add source rules requiring `IntersectionObserver`, `requestAnimationFrame`, `prefers-reduced-motion`, and `AnimatedStatValue`.
- [ ] Run `npm test` and confirm the new source rule fails.
- [ ] Add numeric metadata for the four hero statistics without changing final strings.
- [ ] Implement a client component that starts once at 35% visibility, animates for 1200ms, and cleans up observer/frame handles.
- [ ] Reserve width with tabular numerals and an invisible final-value sizing layer.
- [ ] Replace the static hero `<strong>` content with the component and confirm `npm test` passes.

### Task 3: Build, Deploy, and Browser Verification

**Files:**
- Verify: homepage on desktop and mobile.

**Interfaces:**
- Consumes: merged customer-site main commit.
- Produces: production deployment and browser evidence.

- [ ] Run `npm test` and `npm run build`.
- [ ] Push the verified commit to `luqite-ux/yaohui-medical` main.
- [ ] Wait for the matching Vercel Production deployment to reach READY.
- [ ] Verify the four final values, zero console errors, desktop/mobile stability, and reduced-motion behavior on the official domain.
