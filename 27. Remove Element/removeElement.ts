function removeElement(nums: number[], val: number): number {
  for (let i = 0; i < nums.length; i++) {
    nums[i] === val && nums.splice(i, 1) && i--;
  }

  return nums.length;
}

const nums = [0, 1, 2, 2, 3, 0, 4, 2];
const val = 2;

const result = removeElement(nums, val);
console.log(result);
