import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  splitMethod: {
    type: String,
    enum: ["equal", "exact", "percentage"],
    required: true,
  },
  splits: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number,
      percentage: Number,
    },
  ],
});


const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;