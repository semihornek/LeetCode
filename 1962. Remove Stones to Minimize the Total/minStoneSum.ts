class MaxHeap {
  private heap: number[];
  private sum: number;
  constructor() {
    this.heap = [];
    this.sum = 0;
  }

  add = (data: number) => {
    this.heap.push(data);
    this.heapifyUp();
    this.sum += data;
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
    if (this.heap.length === 1) {
      this.sum -= this.heap[0];
      return this.heap.pop()!;
    }

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    this.sum -= deletedElement;
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

  getSum = (): number => this.sum;
}

function minStoneSum(piles: number[], k: number): number {
  const maxHeap = new MaxHeap();

  for (const pile of piles) maxHeap.add(pile);

  for (let i = 0; i < k; i++) {
    let pile = maxHeap.remove();
    pile -= ~~(pile / 2);
    maxHeap.add(pile);
  }

  return maxHeap.getSum();
}

const piles = [5, 4, 9];
const k = 2;
const result = minStoneSum(piles, k);
console.log(result);
