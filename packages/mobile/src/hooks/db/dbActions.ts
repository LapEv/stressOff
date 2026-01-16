import { IUpdateSoundsStatusDB, IUpdateMusicsStatusDB } from '../interfaces'

export interface DBActions {
  UpdateSoundsStatusDB: ({ _id, newSound }: IUpdateSoundsStatusDB) => void
  UpdateMusicsStatusDB: ({ _id, newSound }: IUpdateMusicsStatusDB) => void
}
