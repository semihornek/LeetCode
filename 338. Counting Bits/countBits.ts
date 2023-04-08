function countBits(n: number): number[] {
  const output: number[] = [];
  const memo: { [key: number]: number } = {};

  for (let i = 0; i <= n; i++) {
    output.push(bitCount(i, memo));
  }

  return output;
}

const bitCount = (index: number, memo: { [key: number]: number }) => {
  let sum = 0;
  let i = index;

  while (i !== 0) {
    if (memo[i]) {
      memo[index] = memo[i] + sum;
      return memo[index];
    }
    sum += i % 2;
    i = ~~(i / 2);
  }

  memo[index] = sum;
  return sum;
};
