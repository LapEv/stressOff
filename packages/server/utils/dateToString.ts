export const dateToString = (timestamp: Date) => {
  const date = !timestamp ? new Date() : new Date(timestamp)
  const timeRegex = /^.*T(\d{2}):(\d{2}):(\d{2}).*$/
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T.*$/
  const dateData = dateRegex.exec(
    new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON(),
  )
  const timeData = timeRegex.exec(
    new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON(),
  )
  const myFormat = `${dateData?.[3]}.${dateData?.[2]}.${dateData?.[1]} ${timeData?.[1]}:${timeData?.[2]}`
  return myFormat
}
