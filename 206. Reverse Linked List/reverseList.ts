class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  const prevNode = head;
  let currentNode = head.next;

  while (currentNode !== null) {
    prevNode.next = currentNode.next;
    currentNode.next = head;
    head = currentNode;

    currentNode = prevNode.next;
  }

  return head;
}
