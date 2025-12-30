import { getFile } from '@/api/dataAPI'

export const GetImage = async (imgStorage: string) => {
  if (!imgStorage) return { status: false, data: '' }
  const file = imgStorage.split('/')
  const img = imgStorage ? await getFile({ name: file[file.length - 1] }) : ''
  return { status: true, data: img }
}
