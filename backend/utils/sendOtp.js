import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendOtp = async (email,otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Otp verification',
        text: `Your Otp is ${otp}`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email send successfully')
    } catch (error) {
        console.log("Email send error : ",error)
        throw new Error('Failed to send OTP')
    }
}
