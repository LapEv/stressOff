export interface IHTMLMailer {
  adresses: string
  subject: string
  number: string
  status: string
  topic: string
  description: string
  solution: string
  language: string
  date?: string
}

export interface IHTMLResetPassword {
  password: string
}

export interface ISendMailerRequire {
  adresses: string
  subject: string
  number: string
  status: string | undefined
  topic: string
  description: string
  solution: string
  language: string
}

export interface ISendMailerResetPassword {
  email: string
  password: string
}
