import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;
app.use(cors()); 
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  process.env.EMAIL,     // replace with your email
    pass: process.env.PASSWORD         // generate app password if 2FA is enabled
  }
});

// Email options

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    const mailOptions = {
        from: email,
         replyTo: email, 
        to: process.env.EMAIL, 
        subject: `Contact Form portfolio: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ message: 'Failed to send message. Please try again later.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).send({ message: 'Message sent successfully!' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
