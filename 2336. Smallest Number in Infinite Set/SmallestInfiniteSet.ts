class SmallestInfiniteSet {
  private removedElementsSet: Set<number>;
  private heap: number[];
  constructor() {
    this.removedElementsSet = new Set();
    this.heap = [];
    for (let i = 1; i <= 1000; i++) {
      this.heap.push(i);
    }
  }

  popSmallest(): number {
    if (this.heap.length === 1) {
      this.removedElementsSet.clear();
      return this.heap.pop()!;
    }

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    this.removedElementsSet.add(deletedElement);

    return deletedElement;
  }

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

  addBack(num: number): void {
    if (!this.removedElementsSet.has(num)) return;

    this.heap.push(num);
    this.removedElementsSet.delete(num);
    this.heapifyUp();
  }

  private heapifyUp = () => {
    if (this.heap.length === 1) return;
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex] < this.heap[parentIndex]) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  };
}
