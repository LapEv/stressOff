import { IUnsentData, IUnsentData_ } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const addUnsentData = async ({ type, data }: IUnsentData) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS UnsentData (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, data TEXT, status TEXT NOT NULL);
    INSERT INTO UnsentData (type, data, status) VALUES ("${type}", '${JSON.stringify(data)}', "new");
`)
  } catch (e) {
    console.log('addData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getAllUnsentData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return (await db.getAllAsync('SELECT * FROM UnsentData')) as IUnsentData_[]
  } catch (e) {
    console.log('getUnsentData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getUnsentData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return (await db.getAllAsync(
      'SELECT * FROM UnsentData WHERE status = "new"',
    )) as IUnsentData_[]
  } catch (e) {
    console.log('getUnsentData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delUnsentData = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE UnsentData')
  } catch (e) {
    console.log('delUnsentData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const updateStatusUnsentData = async (id: number | string) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(
      `UPDATE UnsentData SET status = "sent" WHERE id = "${id}"`,
    )
  } catch (e) {
    console.log('updateStatusUnsentData error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
