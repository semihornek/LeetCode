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

function evaluateTree(root: TreeNode | null): boolean {
  return !!evaluateParentNode(root!);
}

const evaluateParentNode = (node: TreeNode): number => {
  switch (node.val) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      node.val = evaluateParentNode(node.left!) || evaluateParentNode(node.right!);
      break;
    case 3:
      node.val = evaluateParentNode(node.left!) && evaluateParentNode(node.right!);
    default:
      break;
  }

  return node.val;
};
