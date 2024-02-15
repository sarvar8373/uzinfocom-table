export const calculateSum = (matchingIndicators) => {
  let sumPlan = 0;
  let sumFact = 0;
  let sumPercent = 0;

  matchingIndicators.forEach((indicator) => {
    if (indicator.unit_formula === "SUM") {
      const parsedPlan = parseFloat(indicator.plan);
      const parsedFact = parseFloat(indicator.fact);

      if (!isNaN(parsedPlan)) {
        sumPlan += parsedPlan;
      }

      if (!isNaN(parsedFact)) {
        sumFact += parsedFact;
      }

      if (sumPlan !== 0) {
        sumPercent =
          indicator.indicator_type === 1
            ? 100 * (1 + (1 - (sumFact / sumPlan) * 1))
            : (sumFact / sumPlan) * 100;
      }
    } else if (indicator.unit_formula === "AVG") {
      const planLength = Array.isArray(indicator.plan)
        ? indicator.plan.length
        : 1;
      const factLength = Array.isArray(indicator.fact)
        ? indicator.fact.length
        : 1;
      sumPlan += parseFloat(indicator.plan) / planLength;
      sumFact += parseFloat(indicator.fact) / factLength;

      if (sumPlan !== 0) {
        if (indicator.indicator_type === 1) {
          sumPercent = 100 * (1 + (1 - (sumFact / sumPlan) * 1));
        } else {
          const calculatedPercent = (sumFact / sumPlan) * 100;
          sumPercent = !isNaN(calculatedPercent) ? calculatedPercent : 0;
        }
      } else {
        sumPercent = 0;
      }
    }
  });

  return {
    sumPlan: sumPlan.toFixed(2),
    sumFact: sumFact.toFixed(2),
    sumPercent: sumPercent.toFixed(2) > 100 ? 100 : sumPercent.toFixed(2),
  };
};
