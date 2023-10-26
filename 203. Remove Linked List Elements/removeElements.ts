class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (head === null) return null;

  while (head?.val === val) head = head.next;

  let prevNode = head;
  let currentNode = head?.next;

  while (currentNode) {
    while (currentNode?.val === val) currentNode = currentNode.next;

    prevNode!.next = currentNode;
    prevNode = currentNode;
    currentNode = currentNode?.next;
  }

  return head;
}
