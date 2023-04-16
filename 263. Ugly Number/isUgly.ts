function isUgly(n: number): boolean {
  if (n < 1) return false;
  const arr = [2, 3, 5];
  for (let i = 0; i < arr.length; i++) {
    while (n % arr[i] === 0) n /= arr[i];
  }
  return n === 1;
}

const result = isUgly(6);
console.log(result);
