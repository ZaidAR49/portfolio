
import nodemailer from "nodemailer";
import {
    emailBodyToOwner,
    emailBodyTouser,
} from "../templates/email-template.js";
import dotenv from "dotenv";
import crypto from "crypto";
import { resetSecurityCode } from "../models/security-model.js";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const contactus = async (req, res) => {
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
        res.status(200).send(
            { message: "Message sent successfully!", details: { ownerResult, userResult } }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        res
            .status(500)
            .send({ message: "Failed to send message. Please try again later." });
    }
};

export const sendsecuritycode = async (req, res) => {
    try {
        const securityCode = crypto.randomBytes(16).toString("hex");
        await resetSecurityCode(securityCode);
        console.log("securityCode stored in database:");
        const emailToOwner = {
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Sending to owner
            subject: "Your Portfolio Admin Access Code",
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2>Admin Access Request</h2>
                    <p>Use the following password to access your dashboard:</p>
                    <h1 style="background: #eee; padding: 10px; display: inline-block; border-radius: 5px;">${securityCode}</h1>
                    <p>If you didn't request this, please ignore this email.</p>
                   </div>`,
        };

        await transporter.sendMail(emailToOwner);

        console.log("Security code sent");
        res.status(200).send({ message: "Security code sent successfully!" });

    } catch (error) {
        console.error("Error sending security code:", error);
        res.status(500).send({ message: "Failed to send code." });
    }
};

export const checksecuritycode = async (req, res) => {
    try {
        const { securityCode } = req.body;
        if (securityCode) {
            res.status(200).send({ message: "Security code verified successfully!" });
        } else {
            res.status(401).send({ message: "Invalid security code." });
        }
    } catch (error) {
        console.error("Error verifying security code:", error);
        res.status(500).send({ message: "Failed to verify code." });
    }
};