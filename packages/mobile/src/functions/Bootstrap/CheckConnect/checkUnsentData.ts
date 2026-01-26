import { updateStatusMusic, updateStatusSound } from '@/api/dataAPI'
import { getUnsentData, updateStatusUnsentData } from '@/db'
import { IUnsentData_ } from '@/store/interfaces'

export const checkUnsentData = async () => {
  const unsentData = (await getUnsentData()) as IUnsentData_[]
  if (!unsentData) return

  unsentData.map(async ({ data, id, type }) => {
    if (type === 'updateStatusNewSound') {
      await updateStatusSound(JSON.parse(data))
      await updateStatusUnsentData(id)
      return
    }
    if (type === 'updateStatusNewMusic') {
      await updateStatusMusic(JSON.parse(data))
      await updateStatusUnsentData(id)
      return
    }
  })
}
