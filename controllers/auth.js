import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import { User } from "../models/user.js";
import { sendEmail } from "../lib/mailer.js";

class AuthController {
  async signup(req, res) {
    let { firstName, lastName, username, email, password, isVerified } = req.body;

    if (!firstName?.trim() ||!lastName?.trim() ||!username?.trim() ||!email?.trim() ||!password?.trim()) {
        return res.status(400).send({ message: "Invalid/Missing credentials!" });
    }

    const foundUserByEmail = await User.findOne({ where: { email } });
    if (foundUserByEmail) {
      return res.status(400).send({ message: "Email is already in use..." });
    }

    const foundUserByUsername = await User.findOne({ where: { username } });
    if (foundUserByUsername) {
      return res.status(400).send({ message: "Username is already in use..." });
    }

    password = await bcrypt.hash(password, 10);

    await User.create({firstName, lastName, email, username, password, isVerified});

    const user = await User.findOne({ where: { email } });
    const code = `${user.id}-${uniqid()}`;
    const subject = "Welcome to our app!";
    const text = `Hello dear ${firstName} ${lastName},\n\nThis is automated confirmation email that you have successfully signed up to our website! \n\nPlease confirm your account by clicking this website: http://localhost:4002/auth/verify/${code} \n\nSincerely, \nAvagyan Software`;

    await sendEmail({ email, subject, text });
    res.send({ message: `${username} has signed up successfully!` });
  }

  async signin(req, res) { 
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(401).send({ message: "Missing credentials..." });
    }
      
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(401).send({ message: "Wrong Credentials..." });
    }

    if (!foundUser.isVerified) {
      return res.status(401).send({ message: "You are not authorized to sign in, please check your email..."});
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Wrong Credentials..." });
    }

    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.send({message: `${foundUser.username} signed in successfully...`, token});
  }

  async getUser(req, res) {
    res.send({ ...req.user });
  }

  async verify(req, res) {
    const code = req.params.confirmationCode;
    if (!code) {
      return res.status(401).send({ messaage: "Unverified..." });
    }

    const userId = +code.split("-")[0];

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found..." });
    }

    user.isVerified = true;
    user.verificationCode = code;
    await user.save();

    res.send({ message: "Account verified successfully!" });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found..." });
    }

    const code = `${user.id}-${uniqid()}`;
    const subject = "Reset your password!";
    const text = `Hello, \n\nReset your password by clicking this website: http://localhost:4002/auth/forgot-password/reset/${code} \n\nSincerely, \nAvagyan Software`;
    await sendEmail({ email, subject, text });

    res.send({ message: "PLease check your email to reset your password!" });
  }

  async resetPassword(req, res) {
    const sessionId = req.params.sessionId;
    const userId = +sessionId.split("-")[0];
    const newPassword = req.body.password;

    if (!newPassword?.trim()) {
      return res.status(401).send({ message: "Invalid type of password..." });
    }

    const user = await User.findByPk(userId);
    const oldPassword = user.password;
    const samePassword = await bcrypt.compare(newPassword, oldPassword);
    if (samePassword) {
      return res.status(407).send({
        message: "You have already used this password previously...",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const email = user.email;
    const subject = "Password has been reset successfully";
    const text = `Hello ${user.firstName} ${user.lastName}, \n\nYour password has been reset successfully! \n\nSincerely, \nAvagyan Software`;
    await sendEmail({ email, subject, text });

    res.send({ message: "Your password has been reset successfully!" });
  }
}

export default new AuthController();
