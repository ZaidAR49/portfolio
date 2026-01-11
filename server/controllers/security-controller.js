import crypto from "crypto";
import { resetSecurityCode } from "../models/security-model.js";
import transporter from "../helpers/mail-helper.js";
import dotenv from "dotenv";
import { securityCodeEmailTemplate } from "../templates/security-code-email-template.js";
dotenv.config();



export const sendsecuritycode = async (req, res) => {
    try {
        const securityCode = crypto.randomBytes(16).toString("hex");
        await resetSecurityCode(securityCode);
        console.log("securityCode stored in database:");
        const emailToOwner = {
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Sending to owner
            subject: "Your Portfolio Admin Access Code",
            html: securityCodeEmailTemplate(securityCode, process.env.LIVE_URL),
        };

        await transporter.sendMail(emailToOwner);

        console.log("Security code sent");
        res.status(200).send({ message: "Security code sent successfully!" });

    } catch (error) {
        console.error("Error sending security code:", error);
        res.status(500).send({ message: "Failed to send code." });
    }
};

export const pass = async (req, res) => {
    try {
        res.status(200).json({ message: "Security code correct by middleware" });
    } catch (error) {
        console.error("Error verifying security code:", error);
        res.status(500).send({ message: "Failed to verify code." });
    }
};