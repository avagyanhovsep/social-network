import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendSignupMail({ email, firstName, lastName }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Welcome to our app!",
    text: `Hello dear ${firstName} ${lastName},\n\nThis is automated confirmation email that you have successfully signed up to our website! \n\nSincerely, \nAvagyan Software`,
  };

  return transporter.sendMail(mailOptions);
}