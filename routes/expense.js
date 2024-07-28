import express from "express";
import auth from "../middlewares/auth.js";
import { validateExpense } from "../middlewares/validation.js";
import { balanceSheet, getExpense, postExpense } from "../controllers/expense.js";



const router = express.Router();

router.post('/',auth,validateExpense,postExpense);
router.get('/',auth, getExpense);
router.get('/balance-sheet',auth,balanceSheet);

export default router;