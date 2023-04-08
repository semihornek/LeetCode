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

function bstToGst(root: TreeNode | null): TreeNode | null {
  const postOrderArr: TreeNode[] = [];
  const traverseOrder = (node: TreeNode) => {
    node.right && traverseOrder(node.right);
    postOrderArr.push(node);
    node.left && traverseOrder(node.left);
  };
  traverseOrder(root!);

  for (let i = 1; i < postOrderArr.length; i++) postOrderArr[i].val += postOrderArr[i - 1].val;

  return root;
}
