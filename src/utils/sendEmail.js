import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

exports.sendEmail= async (mailOptions)  => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : process.env.EMAILNAME_AUTH,
            pass : process.env.EMAILPASSWORD_AUTH
        }
    });
    const Options = {
        from: `Phantom App <${process.env.EMAILNAME_AUTH}>`,
        to: `${mailOptions.userEmail}`,
        subject: mailOptions.subject,
        html: mailOptions.message
    }
    await transporter.sendMail(Options, (error) => {
        if (error) {
            return false
        } else {
            return true
        }
    })
}
