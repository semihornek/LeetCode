interface heapType {
  char: string;
  count: number;
}

class MaxHeap {
  private heap: Array<heapType>;
  constructor() {
    this.heap = [];
  }

  add = (obj: heapType) => {
    this.heap.push(obj);
    this.heapifyUp();
  };

  private heapifyUp = () => {
    if (this.heap.length === 1) return;
    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex].count > this.heap[parentIndex].count) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): heapType => {
    if (this.heap.length === 1) return this.heap.pop()!;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement;
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
      (this.heap[leftChildIndex] && this.heap[currentIndex].count < this.heap[leftChildIndex].count) ||
      (this.heap[rightChildIndex] && this.heap[currentIndex].count < this.heap[rightChildIndex].count)
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

function frequencySort(s: string): string {
  const map: Map<string, number> = new Map();

  for (let char of s) {
    if (map.has(char)) map.set(char, map.get(char)! + 1);
    else map.set(char, 1);
  }

  const maxHeap = new MaxHeap();
  for (const [key, value] of map.entries()) {
    maxHeap.add({ char: key, count: value });
  }

  let sortedString: string = "";
  for (let i = 0; i < map.size; i++) {
    const element = maxHeap.remove();
    for (let j = 0; j < element.count; j++) sortedString += element.char;
  }

  return sortedString;
}

const result = frequencySort("tree");
console.log(result);
