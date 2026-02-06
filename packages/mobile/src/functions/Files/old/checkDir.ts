import * as FileSystem from 'expo-file-system/legacy'

export const checkDir = async (dir: string) => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(dir)
    if (!dirInfo.exists) {
      console.log(`directory ${dir} doesn't exist, creating…`)
      await FileSystem.makeDirectoryAsync(dir, {
        intermediates: true,
      })
    }
    return true
  } catch (e) {
    return false
  }
}
