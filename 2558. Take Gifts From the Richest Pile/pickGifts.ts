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
    let parentIndex = ~~Math.floor((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex] > this.heap[parentIndex]) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~Math.floor((currentIndex - 1) / 2);
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

  getSum = (): number => this.sum;
}

function pickGifts(gifts: number[], k: number): number {
  const maxHeap = new MaxHeap();

  for (const gift of gifts) maxHeap.add(gift);

  for (let i = 0; i < k; i++) {
    const deletedElement = maxHeap.remove();
    maxHeap.add(~~Math.sqrt(deletedElement));
  }

  return maxHeap.getSum();
}

const gifts = [25, 64, 9, 4, 100];
const k = 4;

const result = pickGifts(gifts, k);
console.log(result);
