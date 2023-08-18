export const isDefined = (value: any): boolean => {
  return value !== undefined && value !== null;
};

export const nullIfFalsy = (predicate: any, value: any): any => {
  return !!predicate ? value : null;
};
