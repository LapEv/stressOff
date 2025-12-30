import { File, Paths } from 'expo-file-system'

export const CheckFile = async (item: string) => {
  try {
    const file = new File(Paths.cache, item)
    return file.exists
  } catch (err) {
    return err
  }
}
