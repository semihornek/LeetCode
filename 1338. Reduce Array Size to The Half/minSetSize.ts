type HeapType = {
  element: string;
  count: number;
};

class MaxHeap {
  private heap: HeapType[];
  private size: number;
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  add = (data: HeapType) => {
    this.heap.push(data);
    this.heapifyUp();
    this.size += data.count;
  };

  private heapifyUp = () => {
    if (this.heap.length === 1) return;

    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~Math.floor((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex].count > this.heap[parentIndex].count) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~Math.floor((currentIndex - 1) / 2);
    }
  };

  remove = () => {
    if (this.heap.length === 1) {
      const deletedNode = this.heap.pop()!;
      this.size -= deletedNode.count;
      return;
    }

    const deletedNode = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    this.size -= deletedNode.count;
    return;
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
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;

    while (
      (this.heap[leftChildIndex] && this.heap[leftChildIndex].count > this.heap[currentIndex].count) ||
      (this.heap[rightChildIndex] && this.heap[rightChildIndex].count > this.heap[currentIndex].count)
    ) {
      let biggestNodeIndex = currentIndex;

      if (this.heap[leftChildIndex] && this.heap[leftChildIndex].count > this.heap[biggestNodeIndex].count)
        biggestNodeIndex = leftChildIndex;

      if (this.heap[rightChildIndex] && this.heap[rightChildIndex].count > this.heap[biggestNodeIndex].count)
        biggestNodeIndex = rightChildIndex;

      [this.heap[currentIndex], this.heap[biggestNodeIndex]] = [this.heap[biggestNodeIndex], this.heap[currentIndex]];
      currentIndex = biggestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };

  getSize = (): number => this.size;
}

function minSetSize(arr: number[]): number {
  let minSetSize = 0;

  const heapObj: { [key: number]: number } = {};
  for (const val of arr) {
    if (!heapObj[val]) heapObj[val] = 1;
    else heapObj[val]++;
  }

  const maxHeap = new MaxHeap();
  for (const element in heapObj) {
    maxHeap.add({ element, count: heapObj[element] });
  }

  while (maxHeap.getSize() > arr.length / 2) {
    maxHeap.remove();
    minSetSize++;
  }

  return minSetSize;
}

const result = minSetSize([3, 3, 3, 3, 5, 5, 5, 2, 2, 7]);
console.log(result);
