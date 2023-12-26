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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p?.val !== q?.val) return false;

  if ((!p?.left && q?.left) || (p?.left && !q?.left)) return false;
  if ((!p?.right && q?.right) || (p?.right && !q?.right)) return false;

  if (p?.left && q?.left && !isSameTree(p.left, q.left)) return false;
  if (p?.right && q?.right && !isSameTree(p.right, q.right)) return false;

  return true;
}
