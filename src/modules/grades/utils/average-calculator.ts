export function calculateWeightedAverage(
  grades: { score: number; weight: number }[],
): number {
  if (grades.length === 0) return 0;

  const totalWeighted = grades.reduce((acc, g) => acc + g.score * g.weight, 0);
  const totalWeight = grades.reduce((acc, g) => acc + g.weight, 0);

  if (totalWeight === 0) return 0;

  return parseFloat((totalWeighted / totalWeight).toFixed(2));
}
