export const getUniqueYears = (vehicles = []) => {
  return [...new Set(vehicles.map((v) => Number(v.year)))].sort(
    (a, b) => b - a,
  );
};
