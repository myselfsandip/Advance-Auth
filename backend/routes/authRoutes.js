import express from "express";
import { login, logout, signup , verifyEmail , forgotPassword,resetPassword } from "../controllers/authControllers.js";
const router = express.Router();



router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/verify_email",verifyEmail);
router.post("/forgot_password",forgotPassword);
router.post("/reset_password",resetPassword);



export default router;