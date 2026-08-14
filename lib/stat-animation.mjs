export function formatAnimatedStat(value, prefix = "", suffix = "", grouping = true) {
  return `${prefix}${Math.round(value).toLocaleString("en-US", { useGrouping: grouping })}${suffix}`;
}

export function easeOutCubic(progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  return 1 - Math.pow(1 - clamped, 3);
}
