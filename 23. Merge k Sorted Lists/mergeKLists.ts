class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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

    let deletedElement = this.heap[0];
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

  size = (): number => this.heap.length;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  const minHeap = new MinHeap();

  for (let list of lists) {
    while (list !== null) {
      minHeap.add(list.val);
      list = list.next;
    }
  }
  if (minHeap.size() === 0) return null;

  const result: ListNode = new ListNode(minHeap.remove());
  let currentNode = result;

  while (minHeap.size() > 0) {
    currentNode.next = new ListNode(minHeap.remove());
    currentNode = currentNode.next;
  }

  return result;
}
