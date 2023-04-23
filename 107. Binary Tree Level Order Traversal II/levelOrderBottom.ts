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

function levelOrderBottom(root: TreeNode | null): number[][] {
  if (root === null) return [];

  const result: { [level: number]: number[] } = {};
  const queue: { node: TreeNode; level: number }[] = [{ node: root, level: 1 }];

  while (queue.length > 0) {
    const { node, level } = queue.shift()!;

    if (result[level]) result[level].push(node.val);
    else result[level] = [node.val];

    if (node.left) {
      queue.push({ node: node.left, level: level + 1 });
    }
    if (node.right) {
      queue.push({ node: node.right, level: level + 1 });
    }
  }

  const reversedLevelOrder: number[][] = [];
  for (let i = Object.keys(result).length; i > 0; i--) {
    reversedLevelOrder.push(result[i]);
  }

  return reversedLevelOrder;
}
