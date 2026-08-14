# Hero Stat Count-Up Design

## Goal

Add restrained count-up motion to the four homepage hero statistics while preserving layout stability, accessibility, and the existing final values.

## Behavior

- Start when the statistics grid first enters the viewport.
- Play once per page load for approximately 1.2 seconds with an ease-out curve.
- Animate `2000` to `2010`, `0` to `600,000`, `0` to `4,000+`, and `13,000` to `13,485`.
- Keep `rolls`, `m²`, `ISO`, `+`, and labels stable while numbers animate.
- Reserve the final text width so cards do not shift during animation.
- When `prefers-reduced-motion: reduce` is enabled, render final values immediately.

## Architecture

- Keep `heroStats` as the source of final display values and add explicit numeric animation metadata.
- Add a focused client component that uses `IntersectionObserver` and `requestAnimationFrame`.
- Render the final accessible value through `aria-label`; the changing visual number is hidden from assistive technology.

## Verification

- Unit-test number interpolation, formatting, and final display composition.
- Browser-test one-time viewport activation, final values, fixed card dimensions, desktop/mobile layouts, and reduced-motion behavior.
- Run the full production build before deployment.
