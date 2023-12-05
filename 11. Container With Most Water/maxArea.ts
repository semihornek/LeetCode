function maxArea(height: number[]): number {
  let maxArea = 0;

  let biggestHeightIndex = 0;
  let currentIndex = 0;

  while (currentIndex < height.length - 1) {
    for (let nextIndex = currentIndex + 1; nextIndex < height.length; nextIndex++) {
      // Find the next biggest height index
      if (height[nextIndex] > height[currentIndex] && biggestHeightIndex === currentIndex) biggestHeightIndex = nextIndex;
      // Find the current area and the max area
      const currentArea =
        (nextIndex - currentIndex) * (height[currentIndex] < height[nextIndex] ? height[currentIndex] : height[nextIndex]);
      if (currentArea > maxArea) maxArea = currentArea;
    }

    // Get to the next starting point
    if (currentIndex === biggestHeightIndex) break;
    currentIndex = biggestHeightIndex;
  }

  return maxArea;
}

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const result = maxArea(height);
console.log(result);
