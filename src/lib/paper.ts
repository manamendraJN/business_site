/** Small seeded random generator so torn edges look the same on every build. */
export function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * A torn-paper edge as an SVG path in a 1000 × 100 box.
 * The paper fills the area BELOW the tear (flip the SVG for the other side).
 */
export function tornEdge(seed = 7, roughness = 18, steps = 46): string {
  const rand = seeded(seed);
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 1000;
    const base = 50 + Math.sin(i * 0.45 + seed) * 12;
    const y = base + (rand() - 0.5) * roughness * 2;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M0,100 L${pts.join(" L")} L1000,100 Z`;
}

/** Points (percent) along a vertical jagged tear, top to bottom. */
export function tearPoints(seed = 3, steps = 22): Array<[number, number]> {
  const rand = seeded(seed);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const y = (i / steps) * 100;
    const x = 50 + (rand() - 0.5) * 7 + (i % 2 ? 1.8 : -1.8);
    return [Number(x.toFixed(2)), Number(y.toFixed(2))];
  });
}

/** A clip-path polygon for one half of a torn page. Both halves share the same edge. */
export function tearPolygon(side: "left" | "right", seed = 3, steps = 22): string {
  const edge = tearPoints(seed, steps)
    .map(([x, y]) => `${x}% ${y}%`)
    .join(", ");
  return side === "left"
    ? `polygon(0% 0%, ${edge}, 0% 100%)`
    : `polygon(100% 0%, ${edge}, 100% 100%)`;
}
