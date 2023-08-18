export function asAsync<T = any>(func: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      resolve(func());
    } catch (e) {
      reject(e);
    }
  });
}

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
