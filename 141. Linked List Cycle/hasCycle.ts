class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function hasCycle(head: ListNode | null): boolean {
  if (head === null) return false;
  const set: Set<ListNode> = new Set();

  while (head !== null) {
    if (set.has(head)) return true;
    set.add(head);
    head = head.next;
  }

  return false;
}
