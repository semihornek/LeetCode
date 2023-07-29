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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  const queue: TreeNode[] = [root!];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (currentNode.val === val) return currentNode;
    currentNode.left && queue.push(currentNode.left);
    currentNode.right && queue.push(currentNode.right);
  }

  return null;
}
