export const calculateSplits = (amount, splitMethod, splits) => {
    const precision = 2; // Number of decimal places to round to
  
    switch (splitMethod) {
      case "equal":
        const equalAmount = parseFloat((amount / splits.length).toFixed(precision));
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
          amount: parseFloat(((split.percentage / 100) * amount).toFixed(precision)),
        }));
        
      default:
        throw new Error("Invalid split method");
    }
  };






export const calculateBalanceSheet = (expenses, userId) => {
    const balanceSheet = {};
  
    expenses.forEach(expense => {
      if (expense.payer.toString() === userId.toString()) {
        // Current user paid for this expense
        expense.splits.forEach(split => {
          if (split.user.toString() !== userId.toString()) {
            if (!balanceSheet[split.user]) balanceSheet[split.user] = 0;
            balanceSheet[split.user] += split.amount;
          }
        });
      } else {
        // Current user owes money for this expense
        const userSplit = expense.splits.find(split => split.user.toString() === userId.toString());
        if (userSplit) {
          if (!balanceSheet[expense.payer]) balanceSheet[expense.payer] = 0;
          balanceSheet[expense.payer] -= userSplit.amount;
        }
      }
    });
  
    return Object.entries(balanceSheet).map(([user, amount]) => ({
      user,
      amount: parseFloat(amount.toFixed(2)),
      type: amount > 0 ? 'to receive' : 'to pay'
    }));
  };
