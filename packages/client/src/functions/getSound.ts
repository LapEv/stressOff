import { getFile } from '../api/dataAPI'

export const GetSound = async (sound: string) => {
  return new Promise(async (resolve, reject) => {
    const file = sound.split('/')
    const fileSound = sound
      ? await getFile({ name: file[file.length - 1] })
      : ''
    resolve({ status: true, data: fileSound })
  })
}
