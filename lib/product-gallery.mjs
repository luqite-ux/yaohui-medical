export function normalizeProductImages(cover, extraData) {
  const metadata = extraData && typeof extraData === "object" ? extraData : {};
  const source = Array.isArray(metadata.images)
    ? metadata.images
    : Array.isArray(metadata.gallery)
      ? metadata.gallery
      : [];

  return [...new Set([cover, ...source].filter((value) => typeof value === "string" && value.trim()))];
}
