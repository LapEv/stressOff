export const htmlResetPassword = (password: string) => {
  return `
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
          Пароль был изменен! 
        </div>
        <div style="height: auto;padding: 5px;margin-top: 50px;margin-left: 30px;" >
          Новый пароль: <b>${password}</b>
        </div>
        <div style="height: auto;padding: 5px;margin-top: 50px;margin-left: 30px;" >
          Вы можете изменить свой пароль у себя в личном кабинете.
        </div>

      </div>
    </body>
  </html>`
}
