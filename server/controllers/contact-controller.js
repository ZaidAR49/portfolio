import {
    emailBodyToOwner,
    emailBodyTouser,
} from "../templates/email-template.js";
import dotenv from "dotenv";
import transporter from "../helpers/mail-helper.js";

dotenv.config();


export const contactus = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const portfolioUrl = process.env.LIVE_URL;

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

