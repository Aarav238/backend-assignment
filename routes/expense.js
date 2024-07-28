import express from "express";
import auth from "../middlewares/auth.js";
import { validateExpense } from "../middlewares/validation.js";
import { balanceSheet, downloadBalanceSheet, getAllExpenses, getExpense, postExpense } from "../controllers/expense.js";



const router = express.Router();

router.post('/',auth,validateExpense,postExpense);
router.get('/',auth, getExpense);
router.get('/all',auth,getAllExpenses);
router.get('/balance-sheet',auth,balanceSheet);
router.get('/balance-sheet/download',auth,downloadBalanceSheet);



export default router;