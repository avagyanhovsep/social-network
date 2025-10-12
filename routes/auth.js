import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../models/user.js";
import { checkCredentials, checkUserSignInInfo, checkUserSignUpInfo } from "../utils/validation.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { sendSignupMail } from "../lib/mailer.js";

export const authRouter = express.Router();

dotenv.config();

authRouter.post("/signup", async (req, res) => {
    const user = req.body;

    const hasValidCredentials = await checkCredentials(user);
    if (!hasValidCredentials) {
        return res.status(401).send({ message: "Missing/Invalid Credentials" });
    }

    const hasUniqueUsername = await checkUserSignUpInfo("username", user.username);
    if (!hasUniqueUsername) {
        return res.status(404).send({ message: "The username is already in use, try another..." });
    }

    const hasUniqueEmail = await checkUserSignUpInfo("email", user.email);
    if (!hasUniqueEmail) {
        return res.status(404).send({ message: "The email is already in use, try another..." });
    }

    user.password = await bcrypt.hash(user.password, 10);

    await User.create({ ...user });
    await sendSignupMail({ email: user.email, firstName: user.firstName, lastName: user.lastName }); 
    res.send({ message: `${user.username} has signed up successfully!` });
});

authRouter.post("/signin", async (req, res) => {
    const user = req.body;
    const keys = Object.keys(user);
    const values = Object.values(user);

    const foundUser = await checkUserSignInInfo(keys[0], values[0]);
    if (!foundUser) {
        return res.status(404).send({ message: "Wrong Credentials..." });
    }

    const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.dataValues.password);
    if (!isPasswordCorrect) {
        return res.status(404).send({ message: "Wrong Credentials..." });
    }

    const token = await jwt.sign({ id: foundUser.dataValues.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.send({message: `${foundUser.dataValues.username} signed in successfully...`, token}); 
});

authRouter.get("/signin", isAuthenticated, async (req, res) => {
    res.send({ ...req.user });
});