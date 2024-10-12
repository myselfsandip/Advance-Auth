import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword , checkAuth} from "../controllers/authControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();


router.get("/check_auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify_email", verifyEmail);
router.post("/forgot_password", forgotPassword);
router.post("/reset_password:token", resetPassword);



export default router;