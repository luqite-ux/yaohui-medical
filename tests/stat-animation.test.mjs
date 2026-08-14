import assert from "node:assert/strict";
import test from "node:test";
import { easeOutCubic, formatAnimatedStat } from "../lib/stat-animation.mjs";

test("formatAnimatedStat preserves affixes and thousands separators", () => {
  assert.equal(formatAnimatedStat(600000, "", " rolls"), "600,000 rolls");
  assert.equal(formatAnimatedStat(4000, "", "+ m²"), "4,000+ m²");
  assert.equal(formatAnimatedStat(2010, "", "", false), "2010");
  assert.equal(formatAnimatedStat(13485, "ISO ", "", false), "ISO 13485");
});

test("easeOutCubic clamps endpoints and advances faster than linear", () => {
  assert.equal(easeOutCubic(-1), 0);
  assert.equal(easeOutCubic(0), 0);
  assert.equal(easeOutCubic(1), 1);
  assert.equal(easeOutCubic(2), 1);
  assert.ok(easeOutCubic(0.5) > 0.5);
});
