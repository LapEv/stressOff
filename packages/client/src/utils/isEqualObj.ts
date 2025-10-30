export const isEqualObj = (object1: object, object2: object) => {
  const props1 = Object.getOwnPropertyNames(object1)
  const props2 = Object.getOwnPropertyNames(object2)

  if (props1.length !== props2.length) {
    return false
  }
  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i]
    const bothAreObjects =
      typeof object1[prop as keyof typeof object1] === 'object' &&
      typeof object2[prop as keyof typeof object2] === 'object'

    if (
      (!bothAreObjects &&
        object1[prop as keyof typeof object1] !==
          object2[prop as keyof typeof object2]) ||
      (bothAreObjects &&
        !isEqualObj(
          object1[prop as keyof typeof object1],
          object2[prop as keyof typeof object2],
        ))
    ) {
      return false
    }
  }
  return true
}
