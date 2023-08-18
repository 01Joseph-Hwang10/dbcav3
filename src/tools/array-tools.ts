export function zip<T1 = any, T2 = any>(arr1: T1[], arr2: T2[]): [T1, T2][] {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result as [T1, T2][];
}
