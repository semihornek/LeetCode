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

    while (currentIndex !== 0 && this.heap[parentIndex] > this.heap[currentIndex]) {
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
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;

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

  size = () => this.heap.length;

  clear = () => (this.heap = []);
}

function minimumOperations(nums: number[]): number {
  let minimumOperationsCount = 0;
  const minHeap = new MinHeap();

  for (let num of nums) {
    if (num > 0) minHeap.add(num);
  }

  while (minHeap.size() > 0) {
    const removedElement = minHeap.remove();
    minHeap.clear();

    for (let i = 0; i < nums.length; i++) {
      nums[i] -= removedElement;
      if (nums[i] > 0) minHeap.add(nums[i]);
    }
    minimumOperationsCount++;
  }

  return minimumOperationsCount;
}

const result = minimumOperations([1, 1, 1, 2, 2, 2, 3, 3]);
console.log(result);
