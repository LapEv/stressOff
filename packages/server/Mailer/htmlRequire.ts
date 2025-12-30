import { serverData } from './../data/const'
import { IHTMLMailer } from './interfaces'

export const htmlRequest = ({
  number,
  status,
  topic,
  description,
  solution,
  date,
  language,
}: IHTMLMailer) => {
  const requestConst = serverData.mailConstants.request
  const statusConst = serverData.mailConstants.status
  const topicConst = serverData.mailConstants.request
  const descriptionConst = serverData.mailConstants.description
  const solutionConst = serverData.mailConstants.solution
  const dateConst = serverData.mailConstants.date
  const footer = serverData.mailMessages.footer
  const footerConst = footer[language as keyof typeof footer] as () => string
  const message = `
  <html>
    <head>
      <base target="_top">
    </head>
    <body>
      <div style="min-height: 500px;background: linear-gradient(#3b555d, #233237, #204d48, #233237, #3b555d); padding: 30px;font-size: calc(0.5rem + 1vmin); font-weight: 100;font-family: 'Mochiy Pop P one', sans-serif;color: white;">
        <div style="width: 50%;height: 100px;display: flex;justify-content: space-between;align-items: center;font-size: calc(2.2rem + 1vmin);font-weight: 700;font-family: 'Mochiy Pop P one';color: white;margin-left: 10px">
          <img alt="Label" style="width: 100px; height: 100px; padding: 10px;" src="cid:stressOffLogo"/>
          StressOff
        </div>
        <div style="height: auto;padding: 5px;margin-top: 50px;margin-left: 30px;" >
          ${requestConst[language as keyof typeof requestConst]}
            <b>${number}</b>
        </div>
        <div style="height: auto; padding: 5px; margin-left: 30px;">
          ${statusConst[language as keyof typeof statusConst]}
            <b>${status}</b>
        </div>
        <div style="height: auto; padding: 5px;margin-left: 30px;">
          ${topicConst[language as keyof typeof topicConst]}
            <b>${topic}</b>
        </div>
        <div style="height: auto; padding: 5px;margin-left: 30px;">
          ${descriptionConst[language as keyof typeof descriptionConst]}
            <b>${description}</b>
        </div>
        <div style="height: auto; padding: 5px;margin-left: 30px;">
          ${solutionConst[language as keyof typeof solutionConst]}
            <b>${solution}</b>
        </div>
        <div style="height: auto; padding: 5px;margin-left: 30px;">
          ${dateConst[language as keyof typeof dateConst]}
            <b>${date}</b>
        </div>
        <div style="color: rgba(255, 255, 255, 0.5);box-shadow: 0 0 30px rgb(0 0 0 / 50%);padding: 20px 20px;margin-top: 30px;font-size: calc(0.5rem + 0.8vh);font-family: 'Mochiy Pop P one', sans-serif;}">
          ${footerConst()}
        </div>
      </div>
    </body>
  </html>`
  return message
}
