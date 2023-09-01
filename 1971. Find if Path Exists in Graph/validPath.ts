function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  if (source === destination) return true;
  if (edges.length === 0) return false;

  const graph = createGraph(edges);

  const queue: number[] = [source];
  const visited: Set<number> = new Set([source]);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (currentNode === destination) return true;

    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  return false;
}

const createGraph = (edges: number[][]): { [key: number]: number[] } => {
  const graph: { [key: number]: number[] } = {};

  for (const [nodeA, nodeB] of edges) {
    if (!graph[nodeA]) graph[nodeA] = [];
    if (!graph[nodeB]) graph[nodeB] = [];

    graph[nodeA].push(nodeB);
    graph[nodeB].push(nodeA);
  }

  return graph;
};

const n = 6;
const edges = [
  [0, 1],
  [0, 2],
  [3, 5],
  [5, 4],
  [4, 3],
];
const source = 0;
const destination = 5;

const result = validPath(n, edges, source, destination);
console.log(result);
