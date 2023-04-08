class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function pairSum(head: ListNode | null): number {
  let maxValue = 0;
  const sumArr: number[] = [];

  while (head !== null) {
    sumArr.push(head.val);
    head = head.next;
  }

  const llLength = sumArr.length;
  for (let i = 0; i < llLength / 2; i++) {
    if (sumArr[i] + sumArr[llLength - i - 1] > maxValue) maxValue = sumArr[i] + sumArr[llLength - i - 1];
  }

  return maxValue;
}
