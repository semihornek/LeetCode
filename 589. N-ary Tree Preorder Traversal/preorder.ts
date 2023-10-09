export class Node {
  val: number;
  children: Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

function preorder(root: Node | null): number[] {
  if (root === null) return [];
  const result: number[] = [];

  const traverseOrder = (node: Node) => {
    result.push(node.val);
    for (const child of node.children) {
      traverseOrder(child);
    }
  };
  traverseOrder(root);

  return result;
}
