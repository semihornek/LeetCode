function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const length = nums1.length + nums2.length;
  const isLengthOdd = length % 2 === 1;

  const result: number[] = [];
  let i = 0;
  let j = 0;
  while (result.length !== length) {
    if (nums1[i] === undefined || nums1[i] >= nums2[j]) {
      result.push(nums2[j]);
      j++;
    } else if (nums2[j] === undefined || nums2[j] >= nums1[i]) {
      result.push(nums1[i]);
      i++;
    }

    if (isLengthOdd) {
      if (result.length === (length + 1) / 2) {
        return result.pop()!;
      }
    } else {
      if (result.length === length / 2 + 1) {
        return (result.pop()! + result.pop()!) / 2;
      }
    }
  }

  return 0;
}

const nums1 = [0, 0];
const nums2 = [0, 0];
const result = findMedianSortedArrays(nums1, nums2);
console.log(result);
