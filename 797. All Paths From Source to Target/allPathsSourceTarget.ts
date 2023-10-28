function allPathsSourceTarget(graph: number[][]): number[][] {
  const result: number[][] = [];

  const queue: { node: number; path: number[] }[] = [{ node: 0, path: [0] }];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    if (node === graph.length - 1) result.push(path);

    for (let neighbor of graph[node]) {
      queue.push({ node: neighbor, path: [...path, neighbor] });
    }
  }

  return result;
}

const graph = [[4, 3, 1], [3, 2, 4], [3], [4], []];
const result = allPathsSourceTarget(graph);
console.log(result);
