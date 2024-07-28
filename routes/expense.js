import express from "express";
import auth from "../middlewares/auth";
import { validateExpense } from "../middlewares/validation";
import { balanceSheet, getExpense, postExpense } from "../controllers/expense";



const router = express.Router();

router.post('/',auth,validateExpense,postExpense);
router.get('/',auth, getExpense);
router.get('/balance-sheet',auth,balanceSheet);

export default router;