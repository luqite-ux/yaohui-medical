# Home Visual Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage Banner copy cleanly readable and replace three inconsistent product photos with coherent medical catalog imagery.

**Architecture:** Keep the existing homepage markup and motion system. Implement the Banner treatment in CSS and keep product asset references centralized in `lib/site-data.ts`; generate three independent raster assets for the current product records.

**Tech Stack:** Next.js 16, React 19, CSS, Next Image, built-in image generation, Node source-rule tests, Playwright CLI.

## Global Constraints

- English-only launch with future locale support unchanged.
- No price, cart, payment, warranty, or guarantee content.
- Preserve the right-side Banner collage and motion.
- Product images must contain no text, logos, hands, packaging, or unrelated props.

---

### Task 1: Banner Readability Layer

**Files:**
- Modify: `tests/site-rules.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `.hero`, `.hero-grid`, and homepage hero copy markup.
- Produces: `.hero-copy` with a white fade layer on desktop and solid white backing on mobile.

- [ ] Add a source rule requiring the `hero-copy` class and `rgba(255, 255, 255, 0.94)`.
- [ ] Run `npm test` and confirm the new rule fails.
- [ ] Add `hero-copy` to the left Banner wrapper and implement its responsive white fade layer.
- [ ] Run `npm test` and confirm all rules pass.

### Task 2: Medical Catalog Product Assets

**Files:**
- Create: `public/images/products/catalog-plaster-bandage.png`
- Create: `public/images/products/catalog-orthopedic-padding.png`
- Create: `public/images/products/catalog-elastic-bandage.png`
- Modify: `tests/site-rules.test.mjs`
- Modify: `lib/site-data.ts`

**Interfaces:**
- Consumes: existing product records and product-card image rendering.
- Produces: three stable local image paths used by home and product pages.

- [ ] Add source rules requiring all three catalog image paths.
- [ ] Run `npm test` and confirm the new rule fails.
- [ ] Generate and visually inspect each product image against the approved photography specification.
- [ ] Move accepted images into the three exact public paths and update product records.
- [ ] Run `npm test` and `npm run build`.

### Task 3: Responsive Production Verification

**Files:**
- Verify: homepage and product routes on the production domain.

**Interfaces:**
- Consumes: deployed Git commit and official domain.
- Produces: desktop/mobile screenshots and status evidence.

- [ ] Push the verified customer-site commit to `luqite-ux/yaohui-medical` main.
- [ ] Wait for the matching Vercel Production deployment to reach READY.
- [ ] Capture 1440x900 and 390x844 homepage screenshots.
- [ ] Confirm Banner readability, product image consistency, no horizontal overflow, and zero console errors.
