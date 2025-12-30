import { htmlResetPassword } from './htmlResetPassword'
import { ISendMailerResetPassword } from './interfaces'
const nodemailer = require('nodemailer')
require('dotenv').config()

export const sendMailResetPassword = ({
  email,
  password,
}: ISendMailerResetPassword) => {
  return new Promise(resolve => {
    console.log('sendMailResetPassword')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'StressOff. Новый пароль.',
      html: htmlResetPassword(password),
      attachments: [
        {
          filename: 'LotusOnPaper.png',
          path: './files/LotusOnPaper.png',
          cid: 'stressOffLogo',
        },
      ],
    }
    transporter.sendMail(mailOptions, function (error: Error, info: string) {
      if (error) {
        resolve(error)
      } else {
        console.log('Email successfully sent! ', info)
        resolve(info)
      }
    })
  })
}
