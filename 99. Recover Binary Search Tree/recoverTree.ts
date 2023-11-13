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
function recoverTree(root: TreeNode | null): void {
  const queue: TreeNode[] = [root!];
  const falsyNodes: TreeNode[] = [];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode.left) {
      const node = checkNode("left", currentNode.val, currentNode.left);
      if (node) falsyNodes.push(node);
      else queue.push(currentNode.left);
    }
    if (currentNode.right) {
      const node = checkNode("right", currentNode.val, currentNode.right);
      if (node) falsyNodes.push(node);
      else queue.push(currentNode.right);
    }

    if (falsyNodes.length === 1) {
      [currentNode.val, falsyNodes[0].val] = [falsyNodes[0].val, currentNode.val];
      return;
    } else if (falsyNodes.length === 2) {
      [falsyNodes[0].val, falsyNodes[1].val] = [falsyNodes[1].val, falsyNodes[0].val];
      return;
    }
  }
}

const checkNode = (direction: string, parentVal: number, comparisonNode: TreeNode): TreeNode | null => {
  const queue: TreeNode[] = [comparisonNode];
  let falsyNode: TreeNode | null = null;

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if ((direction === "left" && currentNode.val > parentVal) || (direction === "right" && currentNode.val < parentVal)) {
      parentVal = currentNode.val;
      falsyNode = currentNode;
    }
    currentNode.left && queue.push(currentNode.left);
    currentNode.right && queue.push(currentNode.right);
  }

  return falsyNode;
};
