export const blobToBase64 = async (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve((reader?.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
