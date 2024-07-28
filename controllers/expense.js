import Expense from "../models/Expense.js";
import { calculateBalanceSheet, calculateSplits } from "../utils/expenseSplitter.js";
import { Parser } from "json2csv";
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

export const getAllExpenses = async(req,res) => {
    try {
        const expenses = await Expense.find({});
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

export const downloadBalanceSheet = async (req, res) => {
    try {
      // Retrieve all expenses with populated payer and splits
      const expenses = await Expense.find().populate("payer splits.user");
  
      // Initialize an empty array to store balance sheet data
      const balanceSheet = [];
  
      // Loop through each expense and format the data for CSV
      expenses.forEach(expense => {
        expense.splits.forEach(split => {
          balanceSheet.push({
            Description: expense.description,
            Amount: expense.amount,
            Date: expense.date.toISOString().split("T")[0],
            Payer: expense.payer.name,
            Participant: split.user.name,
            SplitAmount: expense.splitMethod === "equal" ? (expense.amount / expense.splits.length).toFixed(2) : split.amount,
            SplitPercentage: expense.splitMethod === "percentage" ? split.percentage : null,
            SplitMethod: expense.splitMethod,
          });
        });
      });
  
      // Define the fields for CSV
      const fields = ["Description", "Amount", "Date", "Payer", "Participant", "SplitAmount", "SplitPercentage", "SplitMethod"];
      const opts = { fields };
  
      // Convert JSON to CSV
      const parser = new Parser(opts);
      const csv = parser.parse(balanceSheet);
  
      // Set headers to prompt file download
      res.header("Content-Type", "text/csv");
      res.attachment("balance-sheet.csv");
  
      // Send CSV data
      res.send(csv);
    } catch (error) {
      res.status(500).send(error);
    }
};