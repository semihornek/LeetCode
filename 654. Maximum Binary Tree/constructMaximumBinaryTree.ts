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

const findMaxNodeIndex = (nums: number[]): number => {
  let maxNodeInd = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[maxNodeInd]) maxNodeInd = i;
  }

  return maxNodeInd;
};

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const maxNodeInd = findMaxNodeIndex(nums);

  const root = new TreeNode(nums[maxNodeInd]);
  const leftSubArray: number[] = [];
  const rightSubArray: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (i < maxNodeInd) leftSubArray.push(nums[i]);
    else if (i > maxNodeInd) rightSubArray.push(nums[i]);
  }

  if (leftSubArray.length > 0) root.left = constructMaximumBinaryTree(leftSubArray);
  if (rightSubArray.length > 0) root.right = constructMaximumBinaryTree(rightSubArray);

  return root;
}
