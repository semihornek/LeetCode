type heapType = {
  num: number;
  count: number;
};

class MaxHeap {
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

    while (currentIndex !== 0 && this.heap[parentIndex].count < this.heap[currentIndex].count) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): number => {
    if (this.heap.length === 1) return this.heap.pop()!.num;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement.num;
  };

  private heapifyDown = () => {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) {
      if (this.heap[0].count < this.heap[1].count) {
        [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      }
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;

    while (
      (this.heap[leftChildIndex] && this.heap[leftChildIndex].count > this.heap[currentIndex].count) ||
      (this.heap[rightChildIndex] && this.heap[rightChildIndex].count > this.heap[currentIndex].count)
    ) {
      let biggestNodeIndex = currentIndex;

      if (this.heap[leftChildIndex] && this.heap[biggestNodeIndex].count < this.heap[leftChildIndex].count) {
        biggestNodeIndex = leftChildIndex;
      }
      if (this.heap[rightChildIndex] && this.heap[biggestNodeIndex].count < this.heap[rightChildIndex].count) {
        biggestNodeIndex = rightChildIndex;
      }

      [this.heap[currentIndex], this.heap[biggestNodeIndex]] = [this.heap[biggestNodeIndex], this.heap[currentIndex]];

      currentIndex = biggestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };
}

function topKFrequent(nums: number[], k: number): number[] {
  const result: number[] = [];

  const map: Map<number, number> = new Map();
  for (const num of nums) {
    if (!map.has(num)) map.set(num, 1);
    else map.set(num, map.get(num)! + 1);
  }

  const maxHeap = new MaxHeap();
  for (const [num, count] of map) {
    maxHeap.add({ num, count });
  }

  for (let i = 0; i < k; i++) {
    result.push(maxHeap.remove());
  }

  return result;
}

const nums = [1, 1, 1, 2, 2, 3];
const k = 2;
const result = topKFrequent(nums, k);
console.log(result);
