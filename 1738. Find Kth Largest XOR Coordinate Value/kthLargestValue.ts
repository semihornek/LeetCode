class MaxHeap {
  heap: number[];
  constructor() {
    this.heap = [];
  }

  add = (data: number) => {
    this.heap.push(data);
    this.heapifyUp();
  };

  private heapifyUp = () => {
    if (this.heap.length === 1) return;
    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex] > this.heap[parentIndex]) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): number => {
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
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;

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
}

function kthLargestValue(matrix: number[][], k: number): number {
  const maxHeap = new MaxHeap();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (row === 0 && col > 0) matrix[row][col] ^= matrix[row][col - 1];
      else if (col === 0 && row > 0) matrix[row][col] ^= matrix[row - 1][col];
      else if (row > 0 && col > 0) matrix[row][col] ^= matrix[row - 1][col] ^ matrix[row][col - 1] ^ matrix[row - 1][col - 1];
      maxHeap.add(matrix[row][col]);
    }
  }

  for (let i = 1; i < k; i++) maxHeap.remove();

  return maxHeap.remove();
}

const matrix = [[8, 10, 5, 8, 5, 7, 6, 0, 1, 4, 10, 6, 4, 3, 6, 8, 7, 9, 4, 2]];

const k = 2;

const result = kthLargestValue(matrix, k);
console.log(result);
