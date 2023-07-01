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

function averageOfSubtree(root: TreeNode | null): number {
  let result = 0;
  const queue: TreeNode[] = [root!];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    let sum = 0;
    let nodeCount = 0;
    const traverseOrder = (node: TreeNode) => {
      sum += node.val;
      nodeCount++;
      node.left && traverseOrder(node.left);
      node.right && traverseOrder(node.right);
    };
    traverseOrder(currentNode);

    if (~~(sum / nodeCount) === currentNode.val) result++;

    currentNode.left && queue.push(currentNode.left);
    currentNode.right && queue.push(currentNode.right);
  }

  return result;
}
