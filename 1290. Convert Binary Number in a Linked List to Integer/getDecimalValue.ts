class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function getDecimalValue(head: ListNode | null): number {
  let decVal = 0;

  while (head !== null) {
    decVal = 2 * decVal + head.val;
    head = head.next;
  }

  return decVal;
}
