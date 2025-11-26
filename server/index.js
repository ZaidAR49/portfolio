import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  emailBodyToOwner,
  emailBodyTouser,
} from "./component/email-template.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to accept requests from any frontend
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all common methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
  credentials: false // Set to false when using wildcard origin
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Email options

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const portfolioUrl = "https://zar.onrender.com";

    const emailToOwner = {
      from: process.env.EMAIL,
      replyTo: email,
      to: process.env.EMAIL,
      subject: `Contact Form portfolio `,
      html: emailBodyToOwner(subject, name, email, message),
    };
    const emailToUser = {
      from: process.env.EMAIL,
      to: email,
      subject: "Thank you for contacting us!",
      html: emailBodyTouser(name, portfolioUrl),
    };

    // Send both emails and wait for them to complete
    const [ownerResult, userResult] = await Promise.all([
      transporter.sendMail(emailToOwner),
      transporter.sendMail(emailToUser),
    ]);

    console.log("Email sent to both owner and user");
    res.status(200).send({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .send({ message: "Failed to send message. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
