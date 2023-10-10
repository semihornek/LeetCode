const createGraph = (times: number[][]): { [src: number]: { dst: number; time: number }[] } => {
  const graph: { [src: number]: { dst: number; time: number }[] } = {};

  for (const [src, dst, time] of times) {
    if (!graph[src]) graph[src] = [];
    graph[src].push({ dst, time });
  }

  return graph;
};

function networkDelayTime(times: number[][], n: number, k: number): number {
  const graph = createGraph(times);

  const queue: { currentNode: number; totalTime: number }[] = [{ currentNode: k, totalTime: 0 }];
  const visitedMap: Map<number, number> = new Map();

  while (queue.length > 0) {
    const { currentNode, totalTime } = queue.shift()!;

    if (graph[currentNode]) {
      for (const { dst, time } of graph[currentNode]) {
        if (dst === k) continue;

        if (visitedMap.has(dst)) {
          const currentTime = visitedMap.get(dst)!;
          if (totalTime + time < currentTime) {
            visitedMap.set(dst, totalTime + time);
            queue.push({ currentNode: dst, totalTime: totalTime + time });
          }
        }
        //
        else {
          visitedMap.set(dst, totalTime + time);
          queue.push({ currentNode: dst, totalTime: totalTime + time });
        }
      }
    }
  }

  if (visitedMap.size !== n - 1) return -1;

  let biggestTime = 0;
  for (const time of visitedMap.values()) {
    if (time > biggestTime) biggestTime = time;
  }

  return biggestTime;
}

const times = [
  [2, 1, 1],
  [2, 3, 1],
  [3, 4, 1],
];
const n = 4;
const k = 2;

const result = networkDelayTime(times, n, k);
console.log(result);
