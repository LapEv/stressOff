export const isEmptyObjField = (obj: object, notNeeded: string[]) => {
  const keys = Object.getOwnPropertyNames(obj)
  if (!keys) return false

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const elementAreObject = typeof obj[key as keyof typeof obj]
    const bool = notNeeded.findIndex(value => value.includes(key))

    if (elementAreObject !== 'object') {
      if (bool < 0 && obj[key as keyof typeof obj] === '') {
        return true
      }
    }
    if (
      elementAreObject === 'object' &&
      bool < 0 &&
      isEmptyObjField(obj[key as keyof typeof obj], notNeeded)
    ) {
      return true
    }
  }
  return false
}
