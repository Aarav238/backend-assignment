import Expense from "../models/Expense.js";
import { calculateBalanceSheet, calculateSplits } from "../utils/expenseSplitter.js";

export const postExpense = async(req,res) => {
    try {
        const expense = new Expense({
          ...req.body,
          payer: req.user._id,
          splits: calculateSplits(req.body.amount, req.body.splitMethod, req.body.splits)
        });
        await expense.save();
        res.status(201).send(expense);
      } catch (error) {
        res.status(400).send(error);
      }
}


export const getExpense = async(req, res) => {
    try {
        const expenses = await Expense.find({ payer: req.user._id });
        res.send(expenses);
      } catch (error) {
        res.status(500).send(error);
      }
}

export const balanceSheet = async(req,res) => {
    try {
        const expenses = await Expense.find({ $or: [{ payer: req.user._id }, { 'splits.user': req.user._id }] });
        const balanceSheet = calculateBalanceSheet(expenses, req.user._id);
        res.send(balanceSheet);
      } catch (error) {
        res.status(500).send(error);
      }
}