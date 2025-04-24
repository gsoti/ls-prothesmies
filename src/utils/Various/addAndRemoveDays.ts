export function addArgAndAnastDays(previousArr: string[], arrToAdd: string[]) {
  return [...previousArr, ...arrToAdd];
}
export function removeArgAndAnastDays(
  previousArr: string[],
  arrToRemove: string[]
) {
  return previousArr.filter(item => !arrToRemove.includes(item));
}
