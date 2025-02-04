export const randDate = (startYear: number, endYear: number): Date => {
  const startDate = new Date(startYear, 0, 1); // 1st january of initial year
  const endDate = new Date(endYear, 11, 31); // 31st december of final year

  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());

  return new Date(randomTime);
};
