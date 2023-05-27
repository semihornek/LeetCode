type heapType = { soldierCount: number; row: number };

class MinHeap {
  private heap: heapType[];
  constructor() {
    this.heap = [];
  }

  add = (data: heapType) => {
    this.heap.push(data);
    this.heapifyUp();
  };

  private heapifyUp = () => {
    if (this.heap.length === 1) return;
    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (
      currentIndex !== 0 &&
      (this.heap[currentIndex].soldierCount < this.heap[parentIndex].soldierCount ||
        (this.heap[currentIndex].soldierCount === this.heap[parentIndex].soldierCount &&
          this.heap[currentIndex].row < this.heap[parentIndex].row))
    ) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): number => {
    if (this.heap.length === 1) return this.heap.pop()!.row;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement.row;
  };

  private heapifyDown = () => {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) {
      if (
        this.heap[0].soldierCount > this.heap[1].soldierCount ||
        (this.heap[0].soldierCount === this.heap[1].soldierCount && this.heap[0].row > this.heap[1].row)
      ) {
        [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      }
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;
    while (
      this.heap[leftChildIndex]?.soldierCount <= this.heap[currentIndex]?.soldierCount ||
      this.heap[rightChildIndex]?.soldierCount <= this.heap[currentIndex].soldierCount
    ) {
      let smallestNodeIndex = currentIndex;
      let leftChild = this.heap[leftChildIndex];
      let rightChild = this.heap[rightChildIndex];

      if (
        leftChild?.soldierCount < this.heap[smallestNodeIndex].soldierCount ||
        (leftChild?.soldierCount === this.heap[smallestNodeIndex].soldierCount && leftChild?.row < this.heap[smallestNodeIndex].row)
      ) {
        smallestNodeIndex = leftChildIndex;
      }
      if (
        rightChild?.soldierCount < this.heap[smallestNodeIndex].soldierCount ||
        (rightChild?.soldierCount === this.heap[smallestNodeIndex].soldierCount && rightChild?.row < this.heap[smallestNodeIndex].row)
      ) {
        smallestNodeIndex = rightChildIndex;
      }

      if (smallestNodeIndex === currentIndex) break;

      [this.heap[currentIndex], this.heap[smallestNodeIndex]] = [this.heap[smallestNodeIndex], this.heap[currentIndex]];
      currentIndex = smallestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };
}

function kWeakestRows(mat: number[][], k: number): number[] {
  const result: number[] = [];
  const minHeap = new MinHeap();

  for (let row = 0; row < mat.length; row++) {
    let soldierCount = 0;
    for (let col = 0; col < mat[0].length; col++) {
      mat[row][col] === 1 && soldierCount++;
    }
    minHeap.add({ soldierCount, row });
  }

  for (let row = 0; row < k; row++) {
    result.push(minHeap.remove());
  }

  return result;
}

const mat = [
  [1, 1, 0],
  [1, 1, 0],
  [1, 1, 1],
  [1, 1, 1],
  [0, 0, 0],
  [1, 1, 1],
  [1, 0, 0],
];

const k = 6;

const result = kWeakestRows(mat, k);
console.log(result);
