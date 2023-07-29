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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  if (!root) return;
  const preorderTraversedTree: number[] = [];

  const traverseOrder = (node: TreeNode) => {
    preorderTraversedTree.push(node.val);
    node.left && traverseOrder(node.left);
    node.right && traverseOrder(node.right);
  };
  traverseOrder(root);

  root.left = null;
  for (let i = 1; i < preorderTraversedTree.length; i++) {
    root.right = new TreeNode(preorderTraversedTree[i]);
    root = root.right;
  }
}
