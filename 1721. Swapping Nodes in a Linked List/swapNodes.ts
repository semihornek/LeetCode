class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const findLength = (node: ListNode): number => {
  let length = 0;
  while (node !== null) {
    node = node.next!;
    length++;
  }

  return length;
};

function swapNodes(head: ListNode | null, k: number): ListNode | null {
  const llLength = findLength(head!);
  let currentNode = head!;
  const swappedNodes: ListNode[] = [];

  for (let i = 1; i <= llLength; i++) {
    if (i === k) swappedNodes.push(currentNode);
    if (i === llLength - k + 1) swappedNodes.push(currentNode);
    if (swappedNodes.length === 2) break;
    currentNode = currentNode.next!;
  }
  const firstVal = swappedNodes[0].val;
  swappedNodes[0].val = swappedNodes[1].val;
  swappedNodes[1].val = firstVal;

  return head;
}
