import express from "express";
import { validateRegistration, validateLogin } from "../middlewares/validation";
import { login, register } from "../controllers/auth";


const router = express.Router();


router.post("/register", validateRegistration , register)
router.post("/login",validateLogin,login)


export default router;