export const randIndex = (first: number, last: number): number => {
  return Math.floor(Math.random() * (last - first + 1)) + first;
};
