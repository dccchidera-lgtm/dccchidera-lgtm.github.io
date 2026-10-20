/**
 * Geometry for the decorative WebGL hero fields. Every shape is conceptual: positions, counts and
 * heights are illustrative and never encode a project's real data or results.
 */
export type Motif = 'constellation' | 'corner' | 'regression' | 'network' | 'pathway' | 'tables' | 'bars' | 'branches' | 'clusters';

type Vec = [number, number, number];
type Placement = { x: number; y: number; scale: number };

export type MotifShape = {
  points: Vec[];
  highlights: Vec[];
  /** Line segments as consecutive start and end pairs. */
  segments: Vec[];
  highlightSize: number;
  motion: 'spin' | 'sway';
  /** Group offset as a fraction of the visible half width and half height. */
  wide: Placement;
  narrow: Placement;
};

/** Case pages share one placement so each motif sits inside the hero's circle. */
const CASE_WIDE: Placement = { x: 0.58, y: 0.3, scale: 0.72 };
const CASE_NARROW: Placement = { x: 0.28, y: 0.5, scale: 0.55 };

// Seeded so every visit draws the same shape.
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(random: () => number) {
  return Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
}

function distance(a: Vec, b: Vec) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function cloud(random: () => number, count: number, [rx, ry, rz]: Vec) {
  const points: Vec[] = [];
  while (points.length < count) {
    const x = random() * 2 - 1;
    const y = random() * 2 - 1;
    const z = random() * 2 - 1;
    if (x * x + y * y + z * z > 1) continue;
    points.push([x * rx, y * ry, z * rz]);
  }
  return points;
}

function linkNeighbours(points: Vec[], threshold: number) {
  const degree = new Array<number>(points.length).fill(0);
  const segments: Vec[] = [];
  for (let a = 0; a < points.length; a += 1) {
    for (let b = a + 1; b < points.length && degree[a] < 3; b += 1) {
      if (degree[b] >= 3 || distance(points[a], points[b]) > threshold) continue;
      segments.push(points[a], points[b]);
      degree[a] += 1;
      degree[b] += 1;
    }
  }
  return segments;
}

function curve(from: Vec, control: Vec, to: Vec, steps = 18) {
  const segments: Vec[] = [];
  let previous = from;
  for (let step = 1; step <= steps; step += 1) {
    const t = step / steps;
    const point = [0, 1, 2].map((axis) =>
      (1 - t) * (1 - t) * from[axis] + 2 * (1 - t) * t * control[axis] + t * t * to[axis]) as Vec;
    segments.push(previous, point);
    previous = point;
  }
  return segments;
}

function boxEdges([cx, cy, cz]: Vec, [w, h, d]: Vec) {
  const corner = (sx: number, sy: number, sz: number): Vec => [cx + sx * w / 2, cy + sy * h / 2, cz + sz * d / 2];
  const segments: Vec[] = [];
  for (const s of [-1, 1]) {
    for (const t of [-1, 1]) {
      segments.push(corner(-1, s, t), corner(1, s, t));
      segments.push(corner(s, -1, t), corner(s, 1, t));
      segments.push(corner(s, t, -1), corner(s, t, 1));
    }
  }
  return segments;
}

function starField(random: () => number, count: number, radius: Vec, wide: Placement, narrow: Placement): MotifShape {
  const points = cloud(random, count, radius);
  const volume = (radius[0] * radius[1] * radius[2]) / (6 * 3.6 * 3);
  const segments = linkNeighbours(points, 1.9 * Math.cbrt(volume * 140 / count));
  return {
    points: points.filter((_, index) => index % 9 !== 4),
    highlights: points.filter((_, index) => index % 9 === 4),
    segments,
    highlightSize: 0.3,
    motion: 'spin',
    wide,
    narrow,
  };
}

function regression(random: () => number, narrow: boolean): MotifShape {
  const plane = (x: number, z: number) => 0.32 * x + 0.18 * z;
  const points: Vec[] = [];
  for (let index = 0; index < (narrow ? 40 : 80); index += 1) {
    const x = random() * 10 - 5;
    const z = random() * 4.8 - 2.4;
    points.push([x, plane(x, z) + gaussian(random) * 0.7, z]);
  }
  const segments: Vec[] = [];
  for (const z of [-2.4, -1.2, 0, 1.2, 2.4]) segments.push([-5, plane(-5, z), z], [5, plane(5, z), z]);
  for (const x of [-5, -2.5, 0, 2.5, 5]) segments.push([x, plane(x, -2.4), -2.4], [x, plane(x, 2.4), 2.4]);
  const highlights: Vec[] = [[-3.6, 1.6, 0.8], [-1.2, -2.4, -1.4], [1.4, 2.6, 1.1], [3.8, -0.6, -0.9], [0.4, -1.9, 1.9]];
  highlights.forEach(([x, y, z]) => segments.push([x, y, z], [x, plane(x, z), z]));
  return { points, highlights, segments, highlightSize: 0.34, motion: 'sway', wide: CASE_WIDE, narrow: CASE_NARROW };
}

function network(narrow: boolean): MotifShape {
  const sizes = narrow ? [5, 6, 1] : [6, 8, 1];
  const layers = sizes.map((size, layer) => Array.from({ length: size }, (_, row): Vec => [
    (layer - 1) * 4.5,
    (row - (size - 1) / 2) * (layer === 1 ? 0.95 : 1.15),
    (row % 2 ? 0.45 : -0.45) * (layer === 1 ? 1 : 0.5),
  ]));
  const segments: Vec[] = [];
  for (let layer = 0; layer < 2; layer += 1) {
    layers[layer].forEach((from) => layers[layer + 1].forEach((to) => segments.push(from, to)));
  }
  return {
    points: [...layers[0], ...layers[1]],
    highlights: layers[2],
    segments,
    highlightSize: 0.6,
    motion: 'sway',
    wide: CASE_WIDE,
    narrow: CASE_NARROW,
  };
}

function pathway(random: () => number, narrow: boolean): MotifShape {
  const nodes: Vec[] = [[-4.5, -1.2, 0], [0, 1.4, 0.6], [4.5, -0.4, -0.3]];
  const segments = [...curve(nodes[0], [-2.4, 1.6, 0.3], nodes[1]), ...curve(nodes[1], [2.4, 1.8, 0.2], nodes[2])];
  const points: Vec[] = [];
  nodes.forEach((node) => {
    for (let index = 0; index < (narrow ? 8 : 14); index += 1) {
      const point: Vec = [node[0] + gaussian(random) * 0.8, node[1] + gaussian(random) * 0.8, node[2] + gaussian(random) * 0.6];
      points.push(point);
      segments.push(point, node);
    }
  });
  return { points, highlights: nodes, segments, highlightSize: 0.7, motion: 'sway', wide: CASE_WIDE, narrow: CASE_NARROW };
}

function tables(narrow: boolean): MotifShape {
  const columns = narrow ? [-2.2, 2.2] : [-4, 0, 4];
  const centres = [1.3, -1.3].flatMap((y, row) => columns.map((x, column): Vec => [x, y, (row + column) % 2 ? 0.45 : -0.45]));
  const size: Vec = [2.4, 1.5, 0.9];
  const segments: Vec[] = [];
  const points: Vec[] = [];
  centres.forEach(([x, y, z]) => {
    segments.push(...boxEdges([x, y, z], size));
    for (const offset of [0.25, -0.2]) segments.push([x - 1.2, y + offset, z + 0.45], [x + 1.2, y + offset, z + 0.45]);
    points.push([x - 1.2, y + 0.75, z + 0.45], [x + 1.2, y + 0.75, z + 0.45], [x - 1.2, y - 0.75, z + 0.45], [x + 1.2, y - 0.75, z + 0.45]);
  });
  const links = narrow ? [[0, 1], [1, 3], [2, 3]] : [[0, 1], [1, 2], [1, 4], [3, 4], [4, 5]];
  const highlights: Vec[] = [];
  links.forEach(([a, b]) => {
    const [from, to] = [centres[a], centres[b]];
    const horizontal = from[1] === to[1];
    const start: Vec = horizontal ? [from[0] + 1.2, from[1], from[2]] : [from[0], from[1] - 0.75, from[2]];
    const end: Vec = horizontal ? [to[0] - 1.2, to[1], to[2]] : [to[0], to[1] + 0.75, to[2]];
    segments.push(start, end);
    highlights.push(start, end);
  });
  return { points, highlights, segments, highlightSize: 0.3, motion: 'sway', wide: CASE_WIDE, narrow: CASE_NARROW };
}

function bars(narrow: boolean): MotifShape {
  const columns = narrow ? 5 : 7;
  const rows = narrow ? 3 : 4;
  const segments: Vec[] = [];
  const points: Vec[] = [];
  const highlights: Vec[] = [];
  for (let column = 0; column < columns; column += 1) {
    for (let row = 0; row < rows; row += 1) {
      const x = (column - (columns - 1) / 2) * 1.3;
      const z = (row - (rows - 1) / 2) * 1.3;
      const height = 0.8 + 2.4 * (0.5 + 0.5 * Math.sin(column * 0.9 + row * 0.6)) * (0.65 + 0.35 * Math.cos(row * 1.3 + column * 0.4));
      segments.push(...boxEdges([x, -2 + height / 2, z], [0.7, height, 0.7]));
      ((column * rows + row) % 5 === 2 ? highlights : points).push([x, -2 + height, z]);
    }
  }
  return { points, highlights, segments, highlightSize: 0.36, motion: 'sway', wide: CASE_WIDE, narrow: CASE_NARROW };
}

function branches(narrow: boolean): MotifShape {
  const root: Vec = [-4.2, 0, 0];
  const decision: Vec = [4.2, 0, 0];
  const segments: Vec[] = [];
  const points: Vec[] = [];
  [-2.4, 0, 2.4].forEach((y, branch) => {
    const scenario: Vec = [-1.5, y, branch === 1 ? 0.6 : -0.4];
    segments.push(...curve(root, [-3, y, 0.2], scenario, 10));
    points.push(scenario);
    const leaves = narrow ? [0] : [-0.7, 0.7];
    leaves.forEach((offset, index) => {
      const option: Vec = [1.3, y + offset, scenario[2] + (index ? 0.4 : -0.4)];
      segments.push(...curve(scenario, [0, y + offset, scenario[2]], option, 10));
      segments.push(...curve(option, [2.9, (y + offset) * 0.4, 0], decision, 10));
      points.push(option);
    });
  });
  return { points, highlights: [root, decision], segments, highlightSize: 0.6, motion: 'sway', wide: CASE_WIDE, narrow: CASE_NARROW };
}

function clusters(random: () => number, narrow: boolean): MotifShape {
  const groups: Array<{ centre: Vec; count: number; spread: number }> = [
    { centre: [-2.2, -0.6, 0.2], count: narrow ? 20 : 40, spread: 0.95 },
    { centre: [2.2, 0.7, -0.2], count: narrow ? 20 : 40, spread: 1.05 },
  ];
  const points: Vec[] = [];
  const segments: Vec[] = [];
  groups.forEach(({ centre, count, spread }) => {
    for (let index = 0; index < count; index += 1) {
      const point: Vec = [
        centre[0] + gaussian(random) * spread,
        centre[1] + gaussian(random) * spread * 0.8,
        centre[2] + gaussian(random) * spread * 0.6,
      ];
      points.push(point);
      segments.push(point, centre);
    }
  });
  return { points, highlights: groups.map(({ centre }) => centre), segments, highlightSize: 0.6, motion: 'sway', wide: CASE_WIDE, narrow: CASE_NARROW };
}

export function buildMotif(motif: Motif, narrow: boolean): MotifShape {
  const random = seededRandom(20261020);
  switch (motif) {
    case 'corner':
      return starField(random, narrow ? 34 : 60, [4, 2.6, 2.2], { x: 0.66, y: 0.44, scale: 0.9 }, { x: 0.32, y: 0.55, scale: 0.7 });
    case 'regression':
      return regression(random, narrow);
    case 'network':
      return network(narrow);
    case 'pathway':
      return pathway(random, narrow);
    case 'tables':
      return tables(narrow);
    case 'bars':
      return bars(narrow);
    case 'branches':
      return branches(narrow);
    case 'clusters':
      return clusters(random, narrow);
    default:
      return starField(random, narrow ? 70 : 140, [6, 3.6, 3], { x: 0.42, y: 0.22, scale: 1 }, { x: 0.25, y: 0.45, scale: 0.75 });
  }
}
