function fillCups(amount: number[]): number {
  let totalTime = 0;

  amount = amount.sort((a, b) => b - a);

  while (amount[2] > 0) {
    if (amount[0] >= amount[1] + amount[2]) return amount[0] + totalTime;

    const subtractionAmount = amount[0] - amount[2] + 1;
    amount[0] -= subtractionAmount;
    totalTime += subtractionAmount;
    amount[1] -= subtractionAmount;

    amount = amount.sort((a, b) => b - a);
  }

  return (totalTime += amount[0]);
}

const amount = [6, 4, 4];
const resul = fillCups(amount);
console.log(resul);
