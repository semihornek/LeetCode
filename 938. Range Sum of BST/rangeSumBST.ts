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

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  let sum = 0;
  const queue: TreeNode[] = [root!];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (currentNode.val >= low && currentNode.val <= high) sum += currentNode.val;

    if (currentNode.val <= low) currentNode.right && queue.push(currentNode.right);
    else if (currentNode.val >= high) currentNode.left && queue.push(currentNode.left);
    else if (currentNode.val > low && currentNode.val < high) {
      currentNode.left && queue.push(currentNode.left);
      currentNode.right && queue.push(currentNode.right);
    }
  }

  return sum;
}
