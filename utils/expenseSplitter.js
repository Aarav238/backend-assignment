export const calculateSplits = (amount, splitMethod, splits) => {
  switch (splitMethod) {
    case "equal":
      const equalAmount = amount / splits.length;
      return splits.map((split) => ({ ...split, amount: equalAmount }));
    case "exact":
      const totalExact = splits.reduce((sum, split) => sum + split.amount, 0);
      if (Math.abs(totalExact - amount) > 0.01) {
        throw new Error(
          "The sum of exact amounts does not match the total expense amount"
        );
      }
      return splits;
    case "percentage":
      const totalPercentage = splits.reduce(
        (sum, split) => sum + split.percentage,
        0
      );
      if (Math.abs(totalPercentage - 100) > 0.01) {
        throw new Error("The sum of percentages must equal 100%");
      }
      return splits.map((split) => ({
        ...split,
        amount: (split.percentage / 100) * amount,
      }));
    default:
      throw new Error("Invalid split method");
  }
};
