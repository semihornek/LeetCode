class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function oddEvenList(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  let currentIndex = 1;
  let currentNode = head.next;
  let previousNode = head;

  let oddNodes = new ListNode(0);
  let oddNodesHead = oddNodes;

  while (currentNode !== null) {
    if (currentIndex % 2 === 1) {
      // Get the odd node
      oddNodes.next = new ListNode(currentNode.val);
      oddNodes = oddNodes.next;
      // Delete the node
      previousNode.next = currentNode.next;
    } else {
      previousNode = currentNode;
    }
    currentNode = currentNode.next;
    currentIndex++;
  }

  previousNode.next = oddNodesHead.next;

  return head;
}
