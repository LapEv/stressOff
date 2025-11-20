import { getFile } from './../api/dataAPI'

export const GetImage = async (imgStorage: string) => {
  if (!imgStorage) return { status: false, data: '' }
  return new Promise(async resolve => {
    const file = imgStorage.split('/')
    const img = imgStorage ? await getFile({ name: file[file.length - 1] }) : ''
    resolve({ status: true, data: img })
  })
}
