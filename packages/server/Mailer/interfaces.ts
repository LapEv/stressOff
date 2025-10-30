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

export interface ISendMailer {
  adresses: string
  subject: string
  number: string
  status: string | undefined
  topic: string
  description: string
  solution: string
  language: string
}
