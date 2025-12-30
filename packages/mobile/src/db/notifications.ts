import { INOTIFICATIONS } from '@/store/interfaces'
import * as SQLite from 'expo-sqlite'

export const createNotification = async ({
  _id,
  anonymousUsers,
  body,
  date,
  img,
  name,
  premiumUsers,
  push,
  title,
  unread,
  globalCategory,
}: INOTIFICATIONS) => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS NOTIFICATIONS (id INTEGER PRIMARY KEY AUTOINCREMENT, _id TEXT NOT NULL, anonymousUsers TEXT, body TEXT, date TEXT, img TEXT, name TEXT, premiumUsers TEXT, push TEXT, title TEXT, unread TEXT, globalCategory TEXT);
    INSERT INTO NOTIFICATIONS (_id, anonymousUsers, body, date, img, name, premiumUsers, push, title, unread, globalCategory) VALUES (
        "${_id}",
        '${JSON.stringify(anonymousUsers)}',
        '${JSON.stringify(body)}',
        "${date}",
        "${img}",
        "${name}",
        '${JSON.stringify(premiumUsers)}',
        '${JSON.stringify(push)}',
        '${JSON.stringify(title)}',
        '${JSON.stringify(unread)}',
        "${globalCategory}")
    `)
  } catch (e) {
    console.log('createNotification error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const getNotifications = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('SELECT * FROM NOTIFICATIONS')
  } catch (e) {
    console.log('getNotifications error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}

export const delNotifications = async () => {
  const db = await SQLite.openDatabaseAsync('stressOff')
  try {
    return await db.getAllAsync('DROP TABLE NOTIFICATIONS')
  } catch (e) {
    console.log('delNotifications error = ', e)
  } finally {
    if (db) {
      await db.closeAsync()
    }
  }
}
