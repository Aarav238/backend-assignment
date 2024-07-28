import express from "express";
import { validateRegistration, validateLogin } from "../middlewares/validation.js";
import { login, register } from "../controllers/auth.js";


const router = express.Router();


router.post("/register", validateRegistration , register)
router.post("/login",validateLogin,login)


export default router;