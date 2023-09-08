class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  const llSet: Set<ListNode> = new Set();

  while (headA !== null) {
    llSet.add(headA);
    headA = headA.next;
  }

  while (headB !== null) {
    if (llSet.has(headB)) return headB;
    headB = headB.next;
  }

  return null;
}
