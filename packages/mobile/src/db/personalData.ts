import { IUser, IUserFB } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const createPersonalData = async ({
  _id,
  username,
  email,
  name,
  type,
  roles,
  createdAt,
}: IUserFB) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS personalData (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, username TEXT, email TEXT, name TEXT, type TEXT NOT NULL, roles TEXT, createdAt TEXT);
    INSERT INTO personalData (_id, username, email, name, type, roles, createdAt) VALUES ("${_id}", "${username}", "${email}", "${name}", "${type}", '${JSON.stringify(roles)}', "${createdAt}");
`)
  } catch (e) {
    console.log('createPersonalData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getPesonalData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return (await db.getAllAsync('SELECT * FROM personalData')) as IUser[]
  } catch (e) {
    console.log('getPesonalData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delPesonalData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE personalData')
  } catch (e) {
    console.log('delPesonalData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
