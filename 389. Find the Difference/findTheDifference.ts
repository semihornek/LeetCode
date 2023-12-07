function findTheDifference(s: string, t: string): string {
  const charMap: Map<string, number> = new Map();

  for (let i = 0; i < s.length; i++) {
    if (!charMap.has(s[i])) charMap.set(s[i], 1);
    else charMap.set(s[i], charMap.get(s[i])! + 1);
  }

  for (let i = 0; i < t.length; i++) {
    if (!charMap.has(t[i])) return t[i];
    else {
      const charCount = charMap.get(t[i])!;
      if (charCount === 0) return t[i];
      charMap.set(t[i], charCount - 1);
    }
  }

  return "";
}
