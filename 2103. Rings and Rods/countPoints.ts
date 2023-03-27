function countPoints(rings: string): number {
  const rodMap = new Map<string, Set<string>>();
  for (let i = 0; i < rings.length; i += 2) {
    const color = rings[i];
    const rod = rings[i + 1];
    if (!rodMap.has(rod)) rodMap.set(rod, new Set(color));
    else {
      rodMap.get(rod)?.add(color);
    }
  }

  let pointCount = 0;
  for (const set of rodMap.values()) {
    if (set.size === 3) pointCount++;
  }

  return pointCount;
}

const rings = "B0B6G0R6R0R6G9";
const result = countPoints(rings);
console.log(result);
