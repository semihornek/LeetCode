function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const courseList: { [course: number]: number[] } = {};

  for (const [course, prereqCourse] of prerequisites) {
    if (!courseList[course]) courseList[course] = [];
    courseList[course].push(prereqCourse);
  }

  for (const [course, prereqCourse] of prerequisites) {
    const stack: number[] = [prereqCourse];
    const visited = new Set();

    while (stack.length > 0) {
      const currentPrereqCourse = stack.pop()!;
      if (courseList[currentPrereqCourse]) {
        for (const prereqOfPrereqCourse of courseList[currentPrereqCourse]) {
          if (course === prereqOfPrereqCourse) return false;

          if (!visited.has(prereqOfPrereqCourse)) {
            stack.push(prereqOfPrereqCourse);
            visited.add(prereqOfPrereqCourse);
          }
        }
      }
    }
  }

  return true;
}

const numCourses = 2;
const prerequisites = [
  [1, 0],
  [0, 2],
  [2, 1],
];

const result = canFinish(numCourses, prerequisites);
console.log(result);
