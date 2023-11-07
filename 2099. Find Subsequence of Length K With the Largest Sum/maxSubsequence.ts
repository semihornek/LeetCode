type heapData = {
  index: number;
  data: number;
};

class MaxHeap {
  private heap: heapData[];
  constructor() {
    this.heap = [];
  }

  add = (data: heapData) => {
    this.heap.push(data);
    this.heapifyUp();
  };

  private heapifyUp = () => {
    if (this.heap.length === 0) return;
    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[parentIndex].data < this.heap[currentIndex].data) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): heapData => {
    if (this.heap.length === 1) return this.heap.pop()!;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement;
  };

  private heapifyDown = () => {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) {
      if (this.heap[0] < this.heap[1]) [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;

    while (
      (this.heap[leftChildIndex] && this.heap[currentIndex].data < this.heap[leftChildIndex].data) ||
      (this.heap[rightChildIndex] && this.heap[currentIndex].data < this.heap[rightChildIndex].data)
    ) {
      let biggestNodeIndex = currentIndex;

      if (this.heap[leftChildIndex] && this.heap[biggestNodeIndex].data < this.heap[leftChildIndex].data) {
        biggestNodeIndex = leftChildIndex;
      }
      if (this.heap[rightChildIndex] && this.heap[biggestNodeIndex].data < this.heap[rightChildIndex].data) {
        biggestNodeIndex = rightChildIndex;
      }

      [this.heap[currentIndex], this.heap[biggestNodeIndex]] = [this.heap[biggestNodeIndex], this.heap[currentIndex]];

      currentIndex = biggestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };
}

function maxSubsequence(nums: number[], k: number): number[] {
  const maxHeap = new MaxHeap();

  for (let index = 0; index < nums.length; index++) maxHeap.add({ index, data: nums[index] });

  const result: Array<number> = new Array(nums.length);
  for (let i = 0; i < k; i++) {
    const element = maxHeap.remove();
    result[element.index] = element.data;
  }

  const subsequentResult: number[] = [];
  for (const num of result) if (num !== undefined) subsequentResult.push(num);

  return subsequentResult;
}

const nums = [-1, -2, 3, 4];
const k = 3;

const result = maxSubsequence(nums, k);
console.log(result);
