"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWeightedAverage = calculateWeightedAverage;
function calculateWeightedAverage(grades) {
    if (grades.length === 0)
        return 0;
    const totalWeighted = grades.reduce((acc, g) => acc + g.score * g.weight, 0);
    const totalWeight = grades.reduce((acc, g) => acc + g.weight, 0);
    if (totalWeight === 0)
        return 0;
    return parseFloat((totalWeighted / totalWeight).toFixed(2));
}
//# sourceMappingURL=average-calculator.js.map