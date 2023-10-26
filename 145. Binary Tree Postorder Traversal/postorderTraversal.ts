class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function postorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return [];
  const result: number[] = [];

  const traverseOrder = (node: TreeNode) => {
    node.left && traverseOrder(node.left);
    node.right && traverseOrder(node.right);
    result.push(node.val);
  };
  traverseOrder(root);

  return result;
}
