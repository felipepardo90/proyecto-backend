import nodemailer from "nodemailer"
import { PASS_EMAIL, USER_EMAIL } from "./keys.js"

async function sendMailEth(to, subject, html) {

    const config = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: USER_EMAIL,
            pass: PASS_EMAIL
        }
    }

    const message = {
        from: "Server Felipe Pardo",
        to: to,
        subject: subject,
        html: html
    }

    const transport = nodemailer.createTransport(config)

    try {
        await transport.sendMail(message)
    } catch (error) {
        console.log(error)
    }
}

export default sendMailEth