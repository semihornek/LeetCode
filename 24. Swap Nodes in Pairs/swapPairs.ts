class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  let secondNode: ListNode | null | undefined = head.next;

  // check the head
  head.next = secondNode.next;
  secondNode.next = head;
  head = secondNode;

  // do the other parts
  let prevNode = secondNode.next;
  let firstNode = prevNode?.next;
  secondNode = firstNode?.next;

  while (firstNode && secondNode) {
    prevNode.next = secondNode;
    firstNode.next = secondNode.next;
    secondNode.next = firstNode;

    prevNode = firstNode;
    firstNode = firstNode.next;
    secondNode = firstNode?.next;
  }

  return head;
}
