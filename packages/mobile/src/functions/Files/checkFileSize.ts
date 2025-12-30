import { File, Paths } from 'expo-file-system'

export const CheckFileSize = (item: string) => {
  try {
    const file = new File(Paths.cache, item)
    return file.size
  } catch (err) {
    return err
  }
}
