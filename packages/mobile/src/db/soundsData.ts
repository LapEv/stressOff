import { ISOUNDS, ISOUNDSFB } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const createDataSounds = async (soundDB: ISOUNDSFB[]) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS DATA_SOUNDS (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, name TEXT, globalCategory TEXT, title TEXT, description TEXT, booked TEXT, sound TEXT, storage TEXT, img TEXT, imgStorage TEXT, location TEXT, payment TEXT, category TEXT, newSound TEXT);
`)
    return soundDB.map(async item => {
      return await db.execAsync(
        `INSERT INTO DATA_SOUNDS (_id, name, globalCategory, title, description, booked, sound, storage, img, imgStorage, location, payment, category, newSound) VALUES (
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
        '${JSON.stringify(item.category)}',
        "${item.newSound}")`,
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

export const createDataMusics = async (musicDB: ISOUNDSFB[]) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS DATA_MUSICS (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, name TEXT, globalCategory TEXT, title TEXT, description TEXT, booked TEXT, sound TEXT, storage TEXT, img TEXT, imgStorage TEXT, location TEXT, payment TEXT, category TEXT, newSound TEXT);
`)
    return musicDB.map(async item => {
      return await db.execAsync(
        `INSERT INTO DATA_MUSICS (_id, name, globalCategory, title, description, booked, sound, storage, img, imgStorage, location, payment, category, newSound) VALUES (
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
        '${JSON.stringify(item.category)}',
        "${item.newSound}")`,
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
    return (await db.getAllAsync('SELECT * FROM DATA_SOUNDS')) as ISOUNDS[]
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
    return (await db.getAllAsync('SELECT * FROM DATA_MUSICS')) as ISOUNDS[]
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

export const addColumnSound = async (
  column: string,
  value: string | number | boolean,
) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(
      `ALTER TABLE DATA_SOUNDS ADD COLUMN ${column} TEXT DEFAULT "${value}" NOT NULL`,
    )
  } catch (e) {
    console.log('addColumnSound error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delColumnSound = async (column: string) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(`ALTER TABLE DATA_SOUNDS DROP COLUMN ${column}`)
  } catch (e) {
    console.log('delColumnSound error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const addColumnMusic = async (
  column: string,
  value: string | number | boolean,
) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(
      `ALTER TABLE DATA_MUSICS ADD COLUMN ${column} TEXT DEFAULT "${value}" NOT NULL`,
    )
  } catch (e) {
    console.log('addColumnMusic error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delColumnMusic = async (column: string) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(`ALTER TABLE DATA_MUSICS DROP COLUMN ${column}`)
  } catch (e) {
    console.log('delColumnMusic error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const updateDataSound = async (
  key: string,
  value: string | number | boolean,
  where: string,
  whereValue: string,
) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(
      `UPDATE DATA_SOUNDS SET ${key} = "${value}" WHERE ${where} = "${whereValue}"`,
    )
  } catch (e) {
    console.log('updateDataSound error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const updateDataMusic = async (
  key: string,
  value: string | number | boolean,
  where: string,
  whereValue: string,
) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.execAsync(
      `UPDATE DATA_MUSICS SET ${key} = "${value}" WHERE ${where} = "${whereValue}"`,
    )
  } catch (e) {
    console.log('updateDataMusic error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
