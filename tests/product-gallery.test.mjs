import assert from "node:assert/strict";
import test from "node:test";
import { normalizeProductImages } from "../lib/product-gallery.mjs";

test("uses the cover first and removes duplicate gallery URLs", () => {
  assert.deepEqual(
    normalizeProductImages("https://cdn.example.com/cover.jpg", {
      images: [
        "https://cdn.example.com/detail-1.jpg",
        "https://cdn.example.com/cover.jpg",
        "https://cdn.example.com/detail-1.jpg"
      ]
    }),
    [
      "https://cdn.example.com/cover.jpg",
      "https://cdn.example.com/detail-1.jpg"
    ]
  );
});

test("accepts gallery as a legacy source and drops empty non-string entries", () => {
  assert.deepEqual(
    normalizeProductImages("/images/fallback.png", {
      gallery: ["", null, "/images/detail-a.jpg", 42, "/images/detail-b.jpg"]
    }),
    ["/images/fallback.png", "/images/detail-a.jpg", "/images/detail-b.jpg"]
  );
});

test("returns the fallback cover when product metadata has no gallery", () => {
  assert.deepEqual(normalizeProductImages("/images/fallback.png", null), ["/images/fallback.png"]);
});
