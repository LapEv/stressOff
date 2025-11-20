import { IActiveObj, ICurrentObj } from 'store/Data/interfaces'

export const prepareObject = (
  optional: string | undefined,
  main: string,
  value: string | number | boolean,
  currentobj: ICurrentObj,
  activeobj: IActiveObj | string,
) => {
  if (value === '') {
    value = optional
      ? activeobj[main as keyof typeof activeobj][optional as keyof typeof main]
      : activeobj[main as keyof typeof activeobj]
  }
  if (optional) {
    return {
      ...currentobj,
      [main]: {
        ...(currentobj[main as keyof typeof currentobj] as {}),
        [optional]: value,
      },
    }
  }
  if (main) {
    return {
      ...currentobj,
      [main]: value,
    }
  }
}
