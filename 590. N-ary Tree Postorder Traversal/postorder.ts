export class Node {
  val: number;
  children: Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

function postorder(root: Node | null): number[] {
  if (!root) return [];
  const result: number[] = [];

  const traverseOrder = (node: Node) => {
    for (const child of node.children) traverseOrder(child);
    result.push(node.val);
  };
  traverseOrder(root);

  return result;
}
