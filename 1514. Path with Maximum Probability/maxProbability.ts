const createGraph = (edges: number[][], succProb: number[]) => {
  const graph: { [src: number]: { dst: number; prob: number }[] } = [];

  for (let i = 0; i < edges.length; i++) {
    const [nodeA, nodeB] = edges[i];
    const prob = succProb[i];

    if (!graph[nodeA]) graph[nodeA] = [];
    if (!graph[nodeB]) graph[nodeB] = [];

    graph[nodeA].push({ dst: nodeB, prob });
    graph[nodeB].push({ dst: nodeA, prob });
  }

  return graph;
};

function maxProbability(n: number, edges: number[][], succProb: number[], start_node: number, end_node: number): number {
  const graph = createGraph(edges, succProb);
  const visited: Map<number, number> = new Map();
  const queue: { currentNode: number; currentProb: number }[] = [{ currentNode: start_node, currentProb: 1 }];
  let maxProbability = 0;

  while (queue.length > 0) {
    const { currentNode, currentProb } = queue.shift()!;
    if (currentNode === end_node) maxProbability = currentProb;

    if (!graph[currentNode]) continue;

    for (const { dst, prob } of graph[currentNode]) {
      if (currentProb * prob <= maxProbability || currentProb * prob <= visited.get(dst)!) continue;

      queue.push({ currentNode: dst, currentProb: currentProb * prob });
      visited.set(dst, currentProb * prob);
    }
  }

  return maxProbability;
}

const n = 3;
const edges = [
  [0, 1],
  [1, 2],
  [0, 2],
];
const succProb = [0.5, 0.5, 0.2];
const start_node = 0;
const end_node = 2;

const result = maxProbability(n, edges, succProb, start_node, end_node);
console.log(result);
