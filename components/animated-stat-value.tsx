"use client";

import { useEffect, useRef, useState } from "react";
import { easeOutCubic, formatAnimatedStat } from "@/lib/stat-animation.mjs";

export type AnimatedStat = {
  value: string;
  start: number;
  end: number;
  prefix?: string;
  suffix?: string;
  grouping?: boolean;
  duration?: number;
};

export function AnimatedStatValue({ stat }: { stat: AnimatedStat }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(stat.start);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(stat.end);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const startTime = performance.now();
        const duration = stat.duration ?? 1200;
        const tick = (time: number) => {
          const progress = Math.min(1, (time - startTime) / duration);
          const next = stat.start + (stat.end - stat.start) * easeOutCubic(progress);
          setCurrent(progress === 1 ? stat.end : next);
          if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [stat]);

  const display = formatAnimatedStat(current, stat.prefix, stat.suffix, stat.grouping);

  return (
    <span ref={rootRef} className="animated-stat-value" aria-label={stat.value}>
      <span className="stat-value-sizer" aria-hidden="true">
        {stat.value}
      </span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
