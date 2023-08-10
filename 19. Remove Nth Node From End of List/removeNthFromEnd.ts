class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (head === null) return null;

  const index = findIndexFromStart(head, n);

  if (index === 0) {
    head = head.next;
    return head;
  }

  let previousNode = head;
  let currentNode = head.next;
  let currentIndex = 1;

  while (currentIndex < index) {
    previousNode = currentNode!;
    currentNode = currentNode!.next;
    currentIndex++;
  }
  previousNode.next = currentNode!.next;

  return head;
}

const findIndexFromStart = (node: ListNode, n: number): number => {
  let length = 1;
  while (node.next !== null) {
    node = node.next;
    length++;
  }

  return length - n;
};
