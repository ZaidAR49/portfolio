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
    
    const emailBodyTouser=`<div style="color:rgb(70, 70, 70)">
  <h3>Dear ${name}</h3><p>Thank you for reaching out! We have received your message and will 
    get back to you shortly.</p><p>Best regards,<br>Zaid Radaideh</p> 
</div>`;

    const emailBodyToOwner=`<div style="max-width:600px; margin:auto; font-family:Arial, sans-serif; background-color:#000; color:#fff; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.5);">
  <h2 style=" color:#eee"> message from your portfolio</h2>
  

  <hr style="border: 1px solid #333; margin:20px 0;" />

  <div style="background:#111; padding:15px; border-radius:8px;">
    <h3 style="color:#eee;">📌 Subject</h3>
    <p style="color:#eee;">${subject}</p>

    <h3 style="color:#eee;">👤 Name</h3>
    <p style="color:#eee;">${name}</p>

    <h3 style="color:#eee;">📧 Email</h3>
    <p style="color:#eee;">${email}</p>

    <h3 style="color:#eee;">💬 Message</h3>
    <p style="color:#eee;">${message}</p>
  </div>

</div>`

    const emailToOwner = {
        from: process.env.EMAIL, // replace with your email
         replyTo: email, 
        to: process.env.EMAIL, 
        subject: `Contact Form portfolio `,
        html: emailBodyToOwner
    };
    const emailToUser = {
        from: process.env.EMAIL, 
        to: email, 
        subject: 'Thank you for contacting us!',
        html: emailBodyTouser
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
