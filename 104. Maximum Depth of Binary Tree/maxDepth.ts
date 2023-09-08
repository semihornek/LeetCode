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

function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const queue: { depth: number; node: TreeNode }[] = [{ depth: 1, node: root }];
  let maxDepth = 1;

  while (queue.length > 0) {
    const { depth, node } = queue.shift()!;
    if (depth > maxDepth) maxDepth = depth;

    if (node.left) queue.push({ depth: depth + 1, node: node.left });
    if (node.right) queue.push({ depth: depth + 1, node: node.right });
  }

  return maxDepth;
}
