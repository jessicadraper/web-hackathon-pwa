// db.ts
import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'

export interface Item {
  id: number
  value: string
  timestamp: number
}

let dbPromise: Promise<IDBPDatabase<any>> | null = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB('bench-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('items', { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp')
      }
    })
  }
  return dbPromise
}
