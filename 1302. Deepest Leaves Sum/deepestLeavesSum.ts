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

function deepestLeavesSum(root: TreeNode | null): number {
  let sum = 0;
  let biggestLevel = 0;
  const stack: { level: number; node: TreeNode }[] = [{ level: 0, node: root! }];

  while (stack.length > 0) {
    const { level, node } = stack.pop()!;

    if (!node.left && !node.right && level >= biggestLevel) {
      if (level > biggestLevel) sum = 0;
      sum += node.val;
      biggestLevel = level;
    }

    node.left && stack.push({ level: level + 1, node: node.left });
    node.right && stack.push({ level: level + 1, node: node.right });
  }

  return sum;
}
