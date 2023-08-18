import {zip} from './array-tools';

type DictLike = Record<any, any>;
type Entry = [any, any];

export const strictEqual = (a: DictLike, b: DictLike): boolean => {
  let isEqual = true;
  zip<Entry, Entry>(Object.entries(a), Object.entries(b)).forEach(
    ([[keyA, valueA], [keyB, valueB]]) => {
      if (keyA !== keyB || valueA !== valueB) {
        isEqual = false;
      }
    },
  );
  return isEqual;
};
