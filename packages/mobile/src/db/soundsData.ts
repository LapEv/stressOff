import { IMUSICS, ISOUNDS } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const createDataSounds = async (soundDB: ISOUNDS[]) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS DATA_SOUNDS (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, name TEXT, globalCategory TEXT, title TEXT, description TEXT, booked TEXT, sound TEXT, storage TEXT, img TEXT, imgStorage TEXT, location TEXT, payment TEXT, category TEXT);
`)
    return soundDB.map(async item => {
      return await db.execAsync(
        `INSERT INTO DATA_SOUNDS (_id, name, globalCategory, title, description, booked, sound, storage, img, imgStorage, location, payment, category) VALUES (
        "${item._id}",
        "${item.name}",
        "${item.globalCategory}",
        '${JSON.stringify(item.title)}',
        '${JSON.stringify(item.description)}',
        '${JSON.stringify(item.booked)}',
        "${item.sound}",
        "${item.storage}",
        "${item.img}",
        "${item.imgStorage}",
        "${item.location}",
        "${item.payment}",
        '${JSON.stringify(item.category)}')`,
      )
    })
  } catch (e) {
    console.log('createDataSounds error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const createDataMusics = async (musicDB: IMUSICS[]) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS DATA_MUSICS (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, name TEXT, globalCategory TEXT, title TEXT, description TEXT, booked TEXT, sound TEXT, storage TEXT, img TEXT, imgStorage TEXT, location TEXT, payment TEXT, category TEXT);
`)
    return musicDB.map(async item => {
      return await db.execAsync(
        `INSERT INTO DATA_MUSICS (_id, name, globalCategory, title, description, booked, sound, storage, img, imgStorage, location, payment, category) VALUES (
        "${item._id}",
        "${item.name}",
        "${item.globalCategory}",
        '${JSON.stringify(item.title)}',
        '${JSON.stringify(item.description)}',
        '${JSON.stringify(item.booked)}',
        "${item.sound}",
        "${item.storage}",
        "${item.img}",
        "${item.imgStorage}",
        "${item.location}",
        "${item.payment}",
        '${JSON.stringify(item.category)}')`,
      )
    })
  } catch (e) {
    console.log('createDataMusics error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getDataSounds = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('SELECT * FROM DATA_SOUNDS')
  } catch (e) {
    console.log('getDataSounds error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getDataMusics = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('SELECT * FROM DATA_MUSICS')
  } catch (e) {
    console.log('getDataMusics error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delDataSounds = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE DATA_SOUNDS')
  } catch (e) {
    console.log('delDataSounds error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delDataMusics = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE DATA_MUSICS')
  } catch (e) {
    console.log('delDataMusics error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
