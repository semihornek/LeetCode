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

function isValidBST(root: TreeNode | null): boolean {
  const stack: TreeNode[] = [root!];

  while (stack.length > 0) {
    const currentNode = stack.pop()!;

    const traverseOrder = (node: TreeNode, direction: string): boolean => {
      if (node.left) if (traverseOrder(node.left, direction) === false) return false;
      if (node.right) if (traverseOrder(node.right, direction) === false) return false;

      if (direction === "left") {
        if (currentNode.val <= node.val) return false;
      }
      if (direction === "right") {
        if (currentNode.val >= node.val) return false;
      }
      return true;
    };
    let result = currentNode.left ? traverseOrder(currentNode.left, "left") : true;
    if (result === false) return false;

    result = currentNode.right ? traverseOrder(currentNode.right, "right") : true;
    if (result === false) return false;

    currentNode.left && stack.push(currentNode.left);
    currentNode.right && stack.push(currentNode.right);
  }

  return true;
}
