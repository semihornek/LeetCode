function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  const set: Set<number> = new Set();
  for (let i = 0; i < edges.length; i++) set.add(edges[i][1]);

  const vertices: number[] = [];
  for (let i = 0; i < n; i++) !set.has(i) && vertices.push(i);

  return vertices;
}

const n = 6;
const edges = [
  [0, 1],
  [0, 2],
  [2, 5],
  [3, 4],
  [4, 2],
];

const result = findSmallestSetOfVertices(n, edges);
console.log(result);
