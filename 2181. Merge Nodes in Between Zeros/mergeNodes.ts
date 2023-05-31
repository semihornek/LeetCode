class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeNodes(head: ListNode | null): ListNode | null {
  const mergedNodes = new ListNode();
  let currentMergedNode = mergedNodes;

  head = head!.next;

  let sum = 0;
  while (head !== null) {
    if (head.val > 0) sum += head.val;
    else {
      currentMergedNode.next = new ListNode(sum);
      currentMergedNode = currentMergedNode.next;
      sum = 0;
    }
    head = head.next;
  }

  return mergedNodes.next;
}
