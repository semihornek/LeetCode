class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  let previousNode = head;
  let currentNode = head.next;

  while (currentNode !== null) {
    if (previousNode.val !== currentNode.val) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    while (previousNode.val === currentNode?.val) {
      previousNode.next = currentNode.next;
      currentNode = currentNode.next;
    }
  }

  return head;
}
