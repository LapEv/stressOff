export const isEqualArr = (
  array1: string[][] | string[],
  array2: string[][] | string[],
) => {
  if (!array2 || array2.length < 0) return false
  return (
    array1.length === array2.length &&
    array1.every(function (element, index) {
      return element === array2[index]
    })
  )
}
