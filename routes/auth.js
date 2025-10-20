import express from "express";
import dotenv from "dotenv";
import { isAuthenticated } from "../middlewares/authentication.js";
import authController from "../controllers/auth.js";

export const authRouter = express.Router();

dotenv.config();

authRouter.post("/signup", authController.signup);

authRouter.post("/signin", authController.signin);

authRouter.get("/user", isAuthenticated, authController.getUser);

authRouter.post("/verify", authController.verify); 

authRouter.post("/forgot-password", authController.forgotPassword);

authRouter.post("/forgot-password/verify-code", authController.verifyCode);

authRouter.post("/forgot-password/reset", authController.resetPassword);

authRouter.patch('/profile/settings/change-email', authController.changeUserEmail);
authRouter.patch('/profile/settings/change-password', authController.changeUserPasword);