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
    if (this.heapSize === 1) return;
    let currentIndex = this.heapSize - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex] > this.heap[parentIndex]) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): number => {
    if (this.heapSize === 1) return this.heap.pop()!;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement;
  };

  private heapifyDown = () => {
    if (this.heapSize === 1) return;
    if (this.heapSize === 2) {
      if (this.heap[0] < this.heap[1]) {
        [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      }
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;

    while (this.heap[leftChildIndex] > this.heap[currentIndex] || this.heap[rightChildIndex] > this.heap[currentIndex]) {
      let biggestNodeIndex = currentIndex;

      if (this.heap[leftChildIndex] > this.heap[biggestNodeIndex]) biggestNodeIndex = leftChildIndex;
      if (this.heap[rightChildIndex] > this.heap[biggestNodeIndex]) biggestNodeIndex = rightChildIndex;

      [this.heap[currentIndex], this.heap[biggestNodeIndex]] = [this.heap[biggestNodeIndex], this.heap[currentIndex]];

      currentIndex = biggestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };

  public get heapSize(): number {
    return this.heap.length;
  }
}

function lastStoneWeight(stones: number[]): number {
  const maxHeap = new MaxHeap();

  for (const stone of stones) maxHeap.add(stone);

  while (maxHeap.heapSize > 1) {
    const smashedStone = maxHeap.remove() - maxHeap.remove();
    smashedStone > 0 && maxHeap.add(smashedStone);
  }

  return maxHeap.heapSize > 0 ? maxHeap.remove() : 0;
}

const stones = [2, 7, 4, 1, 8, 1];
const result = lastStoneWeight(stones);
console.log(result);
