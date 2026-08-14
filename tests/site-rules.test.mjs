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

assert.match(combined, /Home/, "navigation must explicitly include Home");
assert.match(combined, /inquiry/i, "site must include inquiry entry points");
assert.doesNotMatch(combined, /\b(price|prices|cart|checkout|payment|pay online)\b/i, "B2B site must not expose commerce language");
assert.doesNotMatch(combined, /\b(warranty|warranties|guarantee|guaranteed)\b|质保|保修|质量保证/i, "site must not publish warranty or guarantee commitments");

const dataFile = fs.readFileSync(path.join(root, "lib", "site-data.ts"), "utf8");
assert.match(dataFile, /supportedLocales:\s*\["en"\]/, "English launch must keep supportedLocales data shape");
assert.match(dataFile, /adminGroup:\s*2/, "new tenant metadata must default to admin group 2");

const nextConfig = fs.readFileSync(path.join(root, "next.config.mjs"), "utf8");
assert.match(nextConfig, /source:\s*['"]\/admin['"]/, "customer site must proxy /admin to huanqiu-admin");
assert.match(nextConfig, /source:\s*['"]\/api\/admin\/:path\*['"]/, "customer site must proxy backend admin APIs");

const loginRoute = fs.readFileSync(path.join(root, "app", "api", "auth", "login", "route.ts"), "utf8");
assert.match(loginRoute, /hq_tenant_id/, "login route must set tenant cookie for portal mode");
assert.match(loginRoute, /NextResponse\.redirect\(new URL\(['"]\/admin['"]/, "login route must use hard document redirect to /admin");

console.log("site rules passed");
