class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (head === null) return null;

  const nodeArr: ListNode[] = [];

  let currentNode: ListNode | null = head;
  while (currentNode !== null) {
    nodeArr.push(currentNode);
    currentNode = currentNode.next;
  }
  const rotationCount = k % nodeArr.length;
  if (!rotationCount) return head;

  for (let i = 0; i < rotationCount; i++) {
    // make the last element head of the list
    currentNode = nodeArr.pop()!; // last element
    nodeArr[nodeArr.length - 1].next = null; // make the next element of the previous element null
    currentNode.next = head;
    head = currentNode;
  }

  return head;
}
