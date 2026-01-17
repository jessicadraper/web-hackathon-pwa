// db-benchmarks.ts
import { getDB } from './db'
import type { Item } from './db'
import { measureOperation, runMultiple } from './benchmark'

export async function writeBenchmark(count: number): Promise<void> {
  const db = await getDB()
  const tx = db.transaction('items', 'readwrite')
  const store = tx.objectStore('items')

  for (let i = 0; i < count; i++) {
    const item: Item = {
      id: i,
      value: crypto.randomUUID().repeat(4),
      timestamp: Date.now()
    }
    store.put(item)
  }

  await tx.done
}


export async function readBenchmark(): Promise<Item[]> {
  const db = await getDB()
  const tx = db.transaction('items', 'readonly')
  const store = tx.objectStore('items')

  const items: Item[] = []
  let cursor = await store.openCursor()
  while (cursor) {
    items.push(cursor.value)
    cursor = await cursor.continue()
  }

  return items
}


export async function runDBBenchmarks() {
// Einzelmessung Write
const writeResult = await measureOperation('IndexedDB Write 10k', () => writeBenchmark(10_000))
console.log(writeResult)

// Einzelmessung Read
const readResult = await measureOperation('IndexedDB Read 10k', () => readBenchmark())
console.log(readResult)

// Mehrfachmessung Write (30 Runs)
//const writeRuns = await runMultiple('IndexedDB Write 10k', () => writeBenchmark(10_000), 30)
}