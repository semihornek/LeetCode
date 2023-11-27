function numIdenticalPairs(nums: number[]): number {
  const map: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) map.set(nums[i], 1);
    else map.set(nums[i], map.get(nums[i])! + 1);
  }

  let numIdenticalPairs = 0;
  for (const val of map.values()) {
    if (val > 1) numIdenticalPairs += (val * (val - 1)) / 2; // get the combination
  }

  return numIdenticalPairs;
}

const nums = [1, 1, 1, 1];
const result = numIdenticalPairs(nums);
console.log(result);
