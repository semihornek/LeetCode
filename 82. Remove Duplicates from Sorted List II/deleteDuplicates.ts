class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const removeTheDuplicatesInHead = (head: ListNode): ListNode | null => {
  while (head.val === head.next?.val) head = head.next;

  return head.next;
};

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head?.next === null) return head;

  while (head?.next && head.val === head.next.val) head = removeTheDuplicatesInHead(head);

  let previousNode = head!;
  let currentNode = head?.next;

  while (currentNode) {
    if (currentNode.val === currentNode.next?.val) {
      while (currentNode?.val === currentNode?.next?.val) currentNode = currentNode.next;
      currentNode = currentNode.next;
      previousNode.next = currentNode;
    } else {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
  }

  return head;
}
