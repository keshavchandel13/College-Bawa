const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL, 
                pass: process.env.GMAIL_PASSWORD 
            }
        });

        let mailOptions = {
            from: process.env.GMAIL, 
            to: to,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendEmail;