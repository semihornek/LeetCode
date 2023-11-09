function lengthOfLongestSubstring(s: string): number {
  let longestSubstrLen = 0;
  const map: Map<string, number> = new Map();

  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) {
      map.set(s[i], i);
      if (map.size > longestSubstrLen) longestSubstrLen = map.size;
    } else {
      i = map.get(s[i])!;
      map.clear();
    }
  }

  return longestSubstrLen;
}

const s = "abcdde";
const result = lengthOfLongestSubstring(s);
console.log(result);
