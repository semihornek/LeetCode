class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let sum = l1!.val + l2!.val;
  let result: ListNode = new ListNode(sum % 10);
  const head = result;

  let tens = sum > 9 ? 1 : 0;
  l1 = l1!.next;
  l2 = l2!.next;

  while (l1 || l2) {
    sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + tens;
    result.next = new ListNode(sum % 10);
    result = result.next;

    tens = sum > 9 ? 1 : 0;
    l1 = l1?.next!;
    l2 = l2?.next!;
  }

  if (tens === 1) result.next = new ListNode(1);

  return head;
}
