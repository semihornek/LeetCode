type heapType = {
  index: number;
  score: number;
};

class MaxHeap {
  private heap: heapType[];
  constructor() {
    this.heap = [];
  }

  add = (data: heapType) => {
    this.heap.push(data);
    this.heapifyUp();
  };

  private heapifyUp = () => {
    if (this.heap.length === 1) return;

    let currentIndex = this.heap.length - 1;
    let parentIndex = ~~((currentIndex - 1) / 2);

    while (currentIndex !== 0 && this.heap[currentIndex].score > this.heap[parentIndex].score) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
      parentIndex = ~~((currentIndex - 1) / 2);
    }
  };

  remove = (): number => {
    if (this.heap.length === 1) return this.heap.pop()!.index;

    const deletedElement = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();

    return deletedElement.index;
  };

  private heapifyDown = () => {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) {
      if (this.heap[0].score < this.heap[1].score) {
        [this.heap[0], this.heap[1]] = [this.heap[1], this.heap[0]];
      }
      return;
    }

    let currentIndex = 0;
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;

    while (
      (this.heap[leftChildIndex] && this.heap[leftChildIndex].score > this.heap[currentIndex].score) ||
      (this.heap[rightChildIndex] && this.heap[rightChildIndex].score > this.heap[currentIndex].score)
    ) {
      let biggestNodeIndex = currentIndex;

      if (this.heap[leftChildIndex] && this.heap[leftChildIndex].score > this.heap[biggestNodeIndex].score)
        biggestNodeIndex = leftChildIndex;

      if (this.heap[rightChildIndex] && this.heap[rightChildIndex].score > this.heap[biggestNodeIndex].score)
        biggestNodeIndex = rightChildIndex;

      [this.heap[currentIndex], this.heap[biggestNodeIndex]] = [this.heap[biggestNodeIndex], this.heap[currentIndex]];

      currentIndex = biggestNodeIndex;
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
    }
  };
}

function findRelativeRanks(score: number[]): string[] {
  const result: Array<string> = new Array(score.length);

  const maxHeap = new MaxHeap();
  for (let index = 0; index < score.length; index++) maxHeap.add({ index, score: score[index] });

  for (let i = 0; i < score.length; i++) {
    const index = maxHeap.remove();
    if (i === 0) result[index] = "Gold Medal";
    else if (i === 1) result[index] = "Silver Medal";
    else if (i === 2) result[index] = "Bronze Medal";
    else result[index] = i + 1 + "";
  }

  return result;
}

const score = [10, 3, 8, 9, 4];
const result = findRelativeRanks(score);
console.log(result);
