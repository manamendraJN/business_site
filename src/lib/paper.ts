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

/**
 * Points (percent) along a vertical tear, top to bottom, the way real paper
 * rips: a slow wander across the page plus fine, uneven teeth.
 */
export function tearPoints(seed = 3, steps = 64): Array<[number, number]> {
  const rand = seeded(seed);
  const phase = rand() * Math.PI * 2;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const wander = Math.sin(t * Math.PI * 2.1 + phase) * 3.2 + Math.sin(t * Math.PI * 5.4 + phase * 1.7) * 1.1;
    const teeth = (rand() - 0.5) * 1.5;
    return [Number((50 + wander + teeth).toFixed(2)), Number((t * 100).toFixed(2))];
  });
}

/**
 * The white, fibrous strip along one side of a tear: where paper rips, the
 * pale core shows through in a band of uneven width. Returns SVG polygon
 * points in the same 0–100 box as tearPoints, lying just inside that half.
 */
export function tearRim(side: "left" | "right", seed = 3, steps = 64, maxWidth = 0.8): string {
  const pts = tearPoints(seed, steps);
  const rand = seeded(seed * 31 + (side === "left" ? 1 : 2));
  const dir = side === "left" ? -1 : 1;
  const inner: string[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    for (let k = 0; k < 3; k++) {
      const t = k / 3;
      // mostly narrow, now and then a longer fibre
      const w = 0.12 + Math.pow(rand(), 2.2) * maxWidth;
      inner.push(`${(x0 + (x1 - x0) * t + dir * w).toFixed(2)},${(y0 + (y1 - y0) * t).toFixed(2)}`);
    }
  }
  const [lx, ly] = pts[pts.length - 1];
  inner.push(`${(lx + dir * 0.2).toFixed(2)},${ly}`);
  return [...pts.map(([x, y]) => `${x},${y}`), ...inner.reverse()].join(" ");
}

/** A clip-path polygon for one half of a torn page. Both halves share the same edge. */
export function tearPolygon(side: "left" | "right", seed = 3, steps = 64): string {
  const edge = tearPoints(seed, steps)
    .map(([x, y]) => `${x}% ${y}%`)
    .join(", ");
  return side === "left"
    ? `polygon(0% 0%, ${edge}, 0% 100%)`
    : `polygon(100% 0%, ${edge}, 100% 100%)`;
}
