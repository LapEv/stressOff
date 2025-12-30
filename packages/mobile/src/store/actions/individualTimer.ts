import { INDIVIDUAL } from '../types'

export const individualStart = (individual: boolean) => {
  return {
    type: INDIVIDUAL,
    payload: individual,
  }
}
