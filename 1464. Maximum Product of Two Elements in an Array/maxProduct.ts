class MaxHeap {
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

    while (currentIndex > 0 && this.heap[currentIndex] > this.heap[parentIndex]) {
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

function maxProduct(nums: number[]): number {
  const maxHeap = new MaxHeap();

  for (let num of nums) maxHeap.add(num);

  return (maxHeap.remove() - 1) * (maxHeap.remove() - 1);
}

const result = maxProduct([3, 4, 5, 2]);
console.log(result);
