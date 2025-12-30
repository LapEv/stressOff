import { IMUSICCategories, ISOUNDCategories } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const createSOUNDS_Categories = async (
  SOUNDS_Categories: ISOUNDCategories[],
) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS SOUNDS_Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, globalCategory TEXT, title TEXT, img TEXT, imgStorage TEXT, img_lt TEXT, imgStorage_lt TEXT, category TEXT, name TEXT);
`)
    return SOUNDS_Categories.map(async item => {
      return await db.execAsync(
        `INSERT INTO SOUNDS_Categories (_id, globalCategory, title, img, imgStorage, img_lt, imgStorage_lt, category) VALUES (
        "${item._id}",
        "${item.globalCategory}",
        '${JSON.stringify(item.title)}',
        "${item.img}",
        "${item.imgStorage}",
        "${item.img_lt}",
        "${item.imgStorage_lt}",
        "${item.category}")`,
      )
    })
  } catch (e) {
    console.log('createSOUNDS_Categories error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const createMUSICS_Categories = async (
  MUSICS_Categories: IMUSICCategories[],
) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS MUSICS_Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, globalCategory TEXT, title TEXT, img TEXT, imgStorage TEXT, img_lt TEXT, imgStorage_lt TEXT, category TEXT, name TEXT);
`)
    return MUSICS_Categories.map(async item => {
      return await db.execAsync(
        `INSERT INTO MUSICS_Categories (_id, globalCategory, title, img, imgStorage, img_lt, imgStorage_lt, category) VALUES (
        "${item._id}",
        "${item.globalCategory}",
        '${JSON.stringify(item.title)}',
        "${item.img}",
        "${item.imgStorage}",
        "${item.img_lt}",
        "${item.imgStorage_lt}",
        "${item.category}")`,
      )
    })
  } catch (e) {
    console.log('createMUSICS_Categories error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getSOUNDS_Categories = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return (await db.getAllAsync(
      'SELECT * FROM SOUNDS_Categories',
    )) as ISOUNDCategories[]
  } catch (e) {
    console.log('getSOUNDS_Categories error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getMUSICS_Categories = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('SELECT * FROM MUSICS_Categories')
  } catch (e) {
    console.log('getMUSICS_Categories error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delSOUNDS_Categories = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE SOUNDS_Categories')
  } catch (e) {
    console.log('delSOUNDS_Categories error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delMUSICS_Categories = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE MUSICS_Categories')
  } catch (e) {
    console.log('delMUSICS_Categories error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
