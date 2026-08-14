import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!["node_modules", ".next", ".git", "tests"].includes(entry.name)) walk(full);
      continue;
    }
    if (/\.(tsx|ts|css|mjs|json)$/.test(entry.name)) files.push(full);
  }
}

walk(root);

const combined = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");

assert.ok(fs.existsSync(path.join(root, "public", "favicon.ico")), "site must provide the conventional favicon.ico asset");
assert.ok(fs.existsSync(path.join(root, "app", "sitemap.ts")), "site must publish sitemap.xml");
assert.ok(fs.existsSync(path.join(root, "app", "robots.ts")), "site must publish robots.txt");
assert.match(combined, /Home/, "navigation must explicitly include Home");
assert.match(combined, /mobile-navigation/, "header must include a mobile navigation control");
assert.match(combined, /logo-mark\.png/, "site chrome must use the visible customer logo asset");
assert.match(combined, /hero-copy/, "homepage banner must isolate copy from brochure imagery");
assert.match(combined, /rgba\(255,\s*255,\s*255,\s*0\.94\)/, "homepage banner copy layer must use the approved 94% white foundation");
assert.match(combined, /AnimatedStatValue/, "hero statistics must use the count-up component");
assert.match(combined, /IntersectionObserver/, "count-up motion must start from viewport visibility");
assert.match(combined, /requestAnimationFrame/, "count-up motion must update on animation frames");
assert.match(combined, /prefers-reduced-motion/, "count-up motion must respect reduced-motion preferences");
assert.match(combined, /\.stat-card\s*>\s*span/, "stat labels must not override nested animated number sizing");
assert.match(combined, /grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/, "hero stat cards must keep equal column widths");
assert.doesNotMatch(combined, /漏/, "site must not contain corrupted footer text");
assert.match(combined, /inquiry/i, "site must include inquiry entry points");
assert.doesNotMatch(combined, /\b(price|prices|cart|checkout|payment|pay online)\b/i, "B2B site must not expose commerce language");
assert.doesNotMatch(combined, /\b(warranty|warranties|guarantee|guaranteed)\b|质保|保修|质量保证/i, "site must not publish warranty or guarantee commitments");
assert.doesNotMatch(combined, /plaster of paris/, "product terminology must consistently capitalize Plaster of Paris");
assert.doesNotMatch(combined, /Bright, certified, export-ready/i, "site must avoid unsupported promotional certification language");
assert.doesNotMatch(combined, /Comfortable wrapping feel|Stable repeat supply|First-aid product programs|Inspection records available on request/i, "elastic bandage copy must not add unsupported claims");

for (const route of ["products", "about", "manufacturing", "quality", "oem-odm", "faq", "contact", "news"]) {
  const page = path.join(root, "app", route, "page.tsx");
  assert.ok(fs.existsSync(page), `${route} must have an independent page`);
  assert.match(fs.readFileSync(page, "utf8"), /metadata|generateMetadata/, `${route} must define page-specific metadata`);
}

assert.ok(fs.existsSync(path.join(root, "app", "news", "[slug]", "page.tsx")), "site must provide a news detail route");
assert.ok(fs.existsSync(path.join(root, "lib", "articles-db.ts")), "news must have a Supabase-backed data layer");
assert.ok(fs.existsSync(path.join(root, "lib", "products-db.ts")), "products must have a Supabase-backed data layer");
for (const page of ["app/page.tsx", "app/products/page.tsx", "app/products/[slug]/page.tsx"]) {
  assert.match(fs.readFileSync(path.join(root, page), "utf8"), /products-db/, `${page} must read products through the server data layer`);
  assert.match(fs.readFileSync(path.join(root, page), "utf8"), /force-dynamic/, `${page} must not freeze Supabase product data at build time`);
}
assert.ok(fs.existsSync(path.join(root, "components", "inquiry-form.tsx")), "inquiry form must provide client-side submission states");
const inquiryForm = fs.readFileSync(path.join(root, "components", "inquiry-form.tsx"), "utf8");
assert.match(inquiryForm, /Submitting/, "inquiry form must show a pending state");
assert.match(inquiryForm, /success|sent/i, "inquiry form must show a success state");
assert.match(inquiryForm, /error|failed/i, "inquiry form must show a failure state");

for (const page of ["app/page.tsx", "app/products/page.tsx"]) {
  assert.match(fs.readFileSync(path.join(root, page), "utf8"), /product-card-link/, `${page} must make the product card content clickable`);
}

const dataFile = fs.readFileSync(path.join(root, "lib", "site-data.ts"), "utf8");
for (const asset of ["catalog-plaster-bandage.png", "catalog-orthopedic-padding.png", "catalog-elastic-bandage.png"]) {
  assert.match(dataFile, new RegExp(asset.replace(".", "\\.")), `product data must use ${asset}`);
}
assert.match(dataFile, /supportedLocales:\s*\["en"\]/, "English launch must keep supportedLocales data shape");
assert.match(dataFile, /adminGroup:\s*2/, "new tenant metadata must default to admin group 2");

const nextConfig = fs.readFileSync(path.join(root, "next.config.mjs"), "utf8");
assert.match(nextConfig, /source:\s*['"]\/admin['"]/, "customer site must proxy /admin to huanqiu-admin");
assert.match(nextConfig, /source:\s*['"]\/api\/admin\/:path\*['"]/, "customer site must proxy backend admin APIs");

const loginRoute = fs.readFileSync(path.join(root, "app", "api", "auth", "login", "route.ts"), "utf8");
assert.match(loginRoute, /hq_tenant_id/, "login route must set tenant cookie for portal mode");
assert.match(loginRoute, /NextResponse\.redirect\(new URL\(['"]\/admin['"]/, "login route must use hard document redirect to /admin");

console.log("site rules passed");
