class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  const mergedList: ListNode = new ListNode();
  let head = mergedList;

  while (list1 !== null) {
    if (!list2 || list1.val <= list2.val) {
      head.next = new ListNode(list1.val);
      list1 = list1.next;
    } else {
      head.next = new ListNode(list2.val);
      list2 = list2.next;
    }
    head = head.next;
  }

  if (list2) head.next = list2;

  return mergedList.next;
}
