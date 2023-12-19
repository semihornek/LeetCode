class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (left === right) return head;

  const reversedList: number[] = [];
  let currentNode = head!;

  for (let i = 1; i <= right; i++) {
    if (i >= left) reversedList.push(currentNode.val);
    currentNode = currentNode.next!;
  }

  currentNode = head!;
  for (let i = 1; i <= right; i++) {
    if (i >= left) currentNode.val = reversedList.pop()!;
    currentNode = currentNode.next!;
  }

  return head;
}
