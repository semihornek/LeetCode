class MaxHeap {
  private heap: number[];
  constructor() {
    this.heap = [];
  }

  private add = (data: number) => {
    this.heap.push(data);
    this.heapifyUp();
  };

  private heapifyUp = () => {
    if (this.heap.length === 1) return;

    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[parentIndex] < this.heap[currentIndex]) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  private remove = (): number => {
    if (this.heap.length === 1) return this.heap.pop()!;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement;
  };

  private heapifyDown = () => {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) {
      if (this.heap[0] < this.heap[1]) {
        [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      }
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;

    while (this.heap[currentIndex] < this.heap[leftChildIndex] || this.heap[currentIndex] < this.heap[rightChildIndex]) {
      let biggestNodeIndex = currentIndex;

      if (this.heap[biggestNodeIndex] < this.heap[leftChildIndex]) biggestNodeIndex = leftChildIndex;
      if (this.heap[biggestNodeIndex] < this.heap[rightChildIndex]) biggestNodeIndex = rightChildIndex;

      [this.heap[currentIndex], this.heap[biggestNodeIndex]] = [this.heap[biggestNodeIndex], this.heap[currentIndex]];

      currentIndex = biggestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };

  sort = (array: number[]): number[] => {
    while (array.length) this.add(array.pop()!);
    while (this.heap.length > 0) array.push(this.remove());

    return array;
  };
}

function deleteGreatestValue(grid: number[][]): number {
  const maxHeap = new MaxHeap();
  for (let arrInd = 0; arrInd < grid.length; arrInd++) maxHeap.sort(grid[arrInd]);

  let greatestValInCol = 0;
  let greatestValueSum = 0;

  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] > greatestValInCol) greatestValInCol = grid[row][col];
    }
    greatestValueSum += greatestValInCol;
    greatestValInCol = 0;
  }

  return greatestValueSum;
}

// Built-in sort method
// function deleteGreatestValue(grid: number[][]): number {
//   for (let arrInd = 0; arrInd < grid.length; arrInd++) {
//     grid[arrInd] = grid[arrInd].sort((a, b) => b - a);
//   }

//   let greatestValInCol = 0;
//   let greatestValueSum = 0;

//   for (let col = 0; col < grid[0].length; col++) {
//     for (let row = 0; row < grid.length; row++) {
//       if (grid[row][col] > greatestValInCol) greatestValInCol = grid[row][col];
//     }
//     greatestValueSum += greatestValInCol;
//     greatestValInCol = 0;
//   }

//   return greatestValueSum;
// }

const grid = [
  [58, 42, 8, 75, 28],
  [35, 21, 13, 21, 72],
];
const result = deleteGreatestValue(grid);
console.log(result);
