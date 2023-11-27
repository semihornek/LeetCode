function strStr(haystack: string, needle: string): number {
  return haystack.indexOf(needle);
}

const haystack = "sadbutsad";
const needle = "sad";
const result = strStr(haystack, needle);
console.log(result);
