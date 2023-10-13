class MinHeap {
  private heap: number[];
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

    while (currentIndex !== 0 && this.heap[currentIndex] < this.heap[parentIndex]) {
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
      if (this.heap[0] > this.heap[1]) {
        [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      }
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;

    while (this.heap[currentIndex] > this.heap[leftChildIndex] || this.heap[currentIndex] > this.heap[rightChildIndex]) {
      let smallestNodeIndex = currentIndex;

      if (this.heap[smallestNodeIndex] > this.heap[leftChildIndex]) smallestNodeIndex = leftChildIndex;
      if (this.heap[smallestNodeIndex] > this.heap[rightChildIndex]) smallestNodeIndex = rightChildIndex;

      [this.heap[currentIndex], this.heap[smallestNodeIndex]] = [this.heap[smallestNodeIndex], this.heap[currentIndex]];

      currentIndex = smallestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };
}

function sortArray(nums: number[]): number[] {
  const minHeap = new MinHeap();
  const numsLength = nums.length;

  while (nums.length > 0) minHeap.add(nums.pop()!);

  for (let i = 0; i < numsLength; i++) nums.push(minHeap.remove());

  return nums;
}

const nums = [5, 2, 3, 1];
const result = sortArray(nums);
console.log(result);
