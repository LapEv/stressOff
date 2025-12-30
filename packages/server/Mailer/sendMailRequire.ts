import { ISendMailerRequire } from './interfaces'
import { dateToString } from '../utils/dateToString'

const nodemailer = require('nodemailer')
const htmlRequest = require('./htmlRequire')
require('dotenv').config()

export const sendMailRequire = ({
  adresses,
  subject,
  number,
  status,
  topic,
  description,
  solution,
  language,
}: ISendMailerRequire) => {
  return new Promise(resolve => {
    console.log('SendMail')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adresses,
      subject: subject,
      html: htmlRequest({
        number: number,
        status: status,
        topic: topic,
        description: description,
        solution: solution,
        date: dateToString(new Date()),
        language,
      }),
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
