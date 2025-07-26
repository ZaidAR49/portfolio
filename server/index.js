import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { emailBodyToOwner, emailBodyTouser } from './component/email-template.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
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
    const portfolioUrl = 'https://zar.onrender.com';
   

    

    const emailToOwner = {
        from: process.env.EMAIL, 
         replyTo: email, 
        to: process.env.EMAIL, 
        subject: `Contact Form portfolio `,
        html: emailBodyToOwner(subject, name, email, message)
    };
    const emailToUser = {
        from: process.env.EMAIL, 
        to: email, 
        subject: 'Thank you for contacting us!',
        html: emailBodyTouser(name,portfolioUrl ) // replace with your portfolio URL
    };

    
    transporter.sendMail(emailToOwner, (error) => {
        if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ message: 'Failed to send message. Please try again later.' });
        }
    });
     transporter.sendMail(emailToUser, (error) => {
        if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ message: 'Failed to send message. Please try again later.' });
        }
    });
    console.log('Email sent to both owner and user');
        res.status(200).send({ message: 'Message sent successfully!' });
    
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
