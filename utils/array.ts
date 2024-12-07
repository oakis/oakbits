export const getHighestNumber = <T>(array: T[], prop: keyof T): number =>
  array.reduce(
    (max, item) =>
      typeof item[prop] === "number" && item[prop] > max ? item[prop] : max,
    0
  );

export const getLowestNumber = <T>(array: T[], prop: keyof T): number =>
  array.reduce(
    (min, item) =>
      typeof item[prop] === "number" && item[prop] < min ? item[prop] : min,
    Number.MAX_VALUE
  );
