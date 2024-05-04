import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === 'Reset') {
            await User.findByIdAndUpdate(userId, { forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000 })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.nodemailer_user,
                pass: process.env.nodemailer_pass
            }
        });
        const mailOptions = {
            from: 'jdhamija816@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        console.log(`mailResponse ${mailResponse}`)
        return mailResponse
    } catch (error) {
        throw new Error(error.message)
    }
}