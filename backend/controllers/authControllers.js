import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/userModel.js";
import { genarateTokenAndSetCookie } from "../utils/genarateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail , sendPasswordResetEmail } from "../mail/emails.js"

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            throw new Error("All Fields are required");
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, msg: "User already exists!" });
        }
        const hashedPass = await bcryptjs.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await User.create({
            email,
            password: hashedPass,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        // JWT
        genarateTokenAndSetCookie(res, user._id);
        // Verification Email
        await sendVerificationEmail(user._id, email, name, verificationToken);

        return res.status(201).json({
            msg: "User Created Successfully!",
            success: true,
            user: {
                ...user._doc,
                password: null
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, msg: error.message })
    }
}

export const verifyEmail = async function (req, res) {
    try {
        const { code } = req.body;
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid or expired verification code" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        return res.status(201).json({
            success: true, msg: "Email Verified Successfully", user: {
                ...user._doc,
                password: null
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, msg: "Invalid Password" });
        }
        await genarateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        return res.status(200).json({
            success: true,
            msg: "Logged in Successfully",
            user: {
                ...user._doc,
                password: null
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, msg: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(201).json({ success: true, msg: "Logged out Successfully!" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success: false, msg: error.message })
    }
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const emailExists = await User.findOne({email});
        if(!emailExists){
            return res.status(400).json({success:false,msg:"User does not exists!"});
        }
        // Genarate Reset Email Token
        const resetToken =  crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() +  1 * 60 * 60 * 1000   // 1 hour
        User.resetPasswordToken = resetToken;
        User.resetPasswordExpiresAt = resetTokenExpiresAt;
        await User.save();

        // Send Email
        await sendPasswordResetEmail(email,`${process.env.CLIENT_URL}/reset_password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success: false, msg: error.message })
    }
}


export const resetPassword = function(req,res)   {
    res.send("Reset");
}