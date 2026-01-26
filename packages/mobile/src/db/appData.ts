import { IAppData_, IAppDataFB_ } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const createAppData = async ({
  language,
  theme,
  notificationsByEmail,
}: IAppDataFB_) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS AppData (id INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT NOT NULL, theme TEXT NOT NULL, notificationsByEmail TEXT);
    INSERT INTO AppData (language, theme, notificationsByEmail) VALUES ("${language}", "${theme}", '${JSON.stringify(notificationsByEmail)}');
`)
  } catch (e) {
    console.log('createAppData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getAppData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return (await db.getAllAsync('SELECT * FROM AppData')) as IAppData_[]
  } catch (e) {
    console.log('getAppData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delAppData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE AppData')
  } catch (e) {
    console.log('delAppData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
