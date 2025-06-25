import * as SQLite from 'expo-sqlite';

const dbPromise = (async () => {
  const db = await SQLite.openDatabaseAsync('items.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS saved_items (
      id TEXT PRIMARY KEY NOT NULL, -- Alterado de INTEGER para TEXT
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      details TEXT -- Nova coluna para guardar dados extras em formato JSON
    );
  `);
  try {
    await db.execAsync('ALTER TABLE saved_items ADD COLUMN details TEXT;');
  } catch (e) {
  }
  return db;
})();

async function getDb() {
  return dbPromise;
}

export async function saveItem(item) {
  const db = await getDb();
  // Salva os detalhes extras como uma string JSON
  const detailsJson = JSON.stringify(item.details || {});
  await db.runAsync(
    'INSERT OR REPLACE INTO saved_items (id, title, body, details) VALUES (?, ?, ?, ?)',
    [item.id, item.title || '', item.body || '', detailsJson]
  );
}

export async function fetchSavedItems() {
  const db = await getDb();
  const results = await db.getAllAsync('SELECT * FROM saved_items');
  // Converte a string JSON de volta para um objeto
  return results.map(item => ({
    ...item,
    details: item.details ? JSON.parse(item.details) : {},
  }));
}

export async function clearSavedItems() {
  const db = await getDb();
  await db.execAsync('DELETE FROM saved_items');
}

export async function deleteItem(id) {
  const db = await getDb();
  await db.runAsync('DELETE FROM saved_items WHERE id = ?', [id]);
}