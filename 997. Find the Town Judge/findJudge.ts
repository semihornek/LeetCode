function findJudge(n: number, trust: number[][]): number {
  if (trust.length === 0 && n === 1) return 1;
  else if (trust.length === 0 && n > 1) return -1;

  const trustMap: { [person: number]: { trusting: number[]; trusted: number[] } } = {};

  let possibleTownJudge = -1;
  for (const [trusting, trusted] of trust) {
    if (!trustMap[trusted]) trustMap[trusted] = { trusting: [], trusted: [] };
    if (!trustMap[trusting]) trustMap[trusting] = { trusting: [], trusted: [] };

    trustMap[trusted].trusted.push(trusting);
    trustMap[trusting].trusting.push(trusted);
    if (trustMap[trusted].trusted.length === n - 1) possibleTownJudge = trusted;
  }

  return trustMap[possibleTownJudge]?.trusting.length === 0 ? possibleTownJudge : -1;
}

const n = 3;
const trust = [
  [1, 3],
  [2, 3],
  [3, 1],
];
const result = findJudge(n, trust);
console.log(result);
