// Löscht alle Einträge aus dem ObjectStore 'items'
export async function clearAllItems(): Promise<void> {
  const db = await getDB();
  const tx = db.transaction("items", "readwrite");
  const store = tx.objectStore("items");
  await store.clear();
  await tx.done;
}
// db-benchmarks.ts
import { getDB } from "./db";
import type { Item } from "./db";
import { measureOperation } from "./benchmark";

export async function writeBenchmark(
  count: number,
  repeat: number = 4,
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction("items", "readwrite");
  const store = tx.objectStore("items");

  for (let i = 0; i < count; i++) {
    const item: Item = {
      id: i,
      value: 'x'.repeat(repeat),
      timestamp: Date.now(),
    };
    store.put(item);
  }

  await tx.done;
}

export async function readBenchmark(): Promise<Item[]> {
  const db = await getDB();
  const tx = db.transaction("items", "readonly");
  const store = tx.objectStore("items");

  const items: Item[] = [];
  let cursor = await store.openCursor();
  while (cursor) {
    items.push(cursor.value);
    cursor = await cursor.continue();
  }

  return items;
}

export async function runDBBenchmarks() {
  await clearAllItems();
  // Einzelmessung Write
  const writeResult = await measureOperation("IndexedDB Write", () =>
    writeBenchmark(10000, 1),
  );
  console.log(writeResult);

  // Einzelmessung Read
  const readResult = await measureOperation("IndexedDB Read", () =>
    readBenchmark(),
  );
  console.log(readResult);

  return [writeResult, readResult];
}
