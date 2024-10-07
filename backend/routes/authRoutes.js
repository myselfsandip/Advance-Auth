import express from "express";
import { login, logout, signup , verifyUser } from "../controllers/authControllers.js";
const router = express.Router();



router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/verify_user",verifyUser);



export default router;