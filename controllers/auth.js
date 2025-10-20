import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user.js";
import { sendEmail } from "../lib/mailer.js";

class AuthController {
  async signup(req, res) {
    let { firstName, lastName, username, email, password, isSigninAllowed } =
      req.body;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !username?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
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

    const signinCode = crypto.randomInt(0, 1000000).toString().padStart(6, "0");

    await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      isSigninAllowed,
      signinCode,
    });

    const subject = "Welcome to our app!";
    const text = `Hello dear ${firstName} ${lastName},\n\nThis is automated confirmation email that you have successfully signed up to our website! \n\nPlease confirm your account by this code: ${signinCode} \n\nSincerely, \nAvagyan Software`;

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

    if (!foundUser.isSigninAllowed) {
      return res.status(401).send({
        message:
          "You are not authorized to sign in, please check your email...",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Wrong Credentials..." });
    }

    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({
      message: `${foundUser.username} signed in successfully...`,
      token,
    });
  }

  async getUser(req, res) {
    res.send({ user: req.user });
  }

  async verify(req, res) {
    const { signinCode, email } = req.body;

    if (!signinCode) {
      return res.status(401).send({ messaage: "Unverified..." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "User not found..." });
    }

    if (user.signinCode !== signinCode) {
      return res.status(401).send({ message: "Wrong code..." });
    }

    user.isSigninAllowed = true;
    await user.save();

    res.send({ message: "Account verified successfully!" });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res
        .status(401)
        .send({ message: "Invalid/Missing credentials..." });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found..." });
    }

    const code = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
    user.cpvc = code;
    await user.save();
    const subject = "Verification code";
    const text = `Please, \n\nEnter the 6-digit code number to change your password: ${code} \n\nSincerely, \nAvagyan Software`;
    await sendEmail({ email, subject, text });

    res.send({ message: "PLease check your email to reset your password!" });
  }

  async verifyCode(req, res) {
    const { code, email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user.cpvc !== code) {
      return res.status(401).send({ message: "Wrong code..." });
    }

    res.send({ message: "Verified successfully!" });
  }

  async resetPassword(req, res) {
    const { password, userEmail } = req.body;
    console.log(password);
    if (!password?.trim()) {
      return res
        .status(401)
        .send({ message: "Invalid/Missing credentials..." });
    }

    const user = await User.findOne({ where: { email: userEmail } });
    const oldPassword = user.password;
    const samePassword = await bcrypt.compare(password, oldPassword);
    if (samePassword) {
      return res.status(407).send({
        message: "You have already used this password previously...",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const email = user.email;
    const subject = "Password has been reset successfully";
    const text = `Hello ${user.firstName} ${user.lastName}, \n\nYour password has been reset successfully! \n\nSincerely, \nAvagyan Software`;
    await sendEmail({ email, subject, text });

    res.send({ message: "Your password has been reset successfully!" });
  }

  async changeUserEmail(req, res) {
    const { currentEmail, newEmail } = req.body;

    if (
      !currentEmail?.trim() ||
      !newEmail?.trim() ||
      currentEmail == newEmail
    ) {
      return res
        .status(401)
        .send({ message: "Missing/Invalid credentials..." });
    }

    const user = await User.findOne({ where: { email: currentEmail } });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found on this email..." });
    }

    user.email = newEmail;
    await user.save();
    res.send({ message: "Email changed successfully!" });
  }

  async changeUserPasword(req, res) {
    const { currentemail, newPassword } = req.body;
    if (!currentemail?.trim() || !newPassword?.trim()) {
      return res
        .status(401)
        .send({ message: "Missing/Invalid credentials..." });
    }   

    const user = await User.findOne({ where: { email: currentemail } });
    if (!user) {    
      return res
        .status(404)
        .send({ message: "User not found on this email..." });
    }

    const areSame = await bcrypt.compare(newPassword, user.password);
    if (areSame) {
      return res
        .status(401)
        .send({
          message: "You have used this password previously, try another...",
        });
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.password = hashedPass;
    await user.save();

    res.send({ message: "Your password has been changed successfully" });
  }
}

export default new AuthController();
