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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (root1 === null) return root2;
  if (root2 === null) return root1;

  root1.val += root2.val;
  const queue: { node1: TreeNode; node2: TreeNode | null | undefined }[] = [{ node1: root1, node2: root2 }];

  while (queue.length > 0) {
    const { node1, node2 } = queue.shift()!;

    if (node1.left) {
      node1.left.val += node2?.left ? node2.left.val : 0;
      queue.push({ node1: node1.left, node2: node2?.left });
    } else if (!node1.left && node2?.left) {
      node1.left = new TreeNode(node2.left.val);
      queue.push({ node1: node1.left, node2: node2.left });
    }

    if (node1.right) {
      node1.right.val += node2?.right ? node2.right.val : 0;
      queue.push({ node1: node1.right, node2: node2?.right });
    } else if (!node1.right && node2?.right) {
      node1.right = new TreeNode(node2.right.val);
      queue.push({ node1: node1.right, node2: node2.right });
    }
  }

  return root1;
}
