import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("app.db");

let initialized = false;

export async function initializeDatabase() {
  if (initialized) {
    return;
  }

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_done INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT NOT NULL
    );
  `);

  await database.execAsync(`
    INSERT OR IGNORE INTO users (id, username, password) VALUES
      (1, 'alice', '1234'),
      (2, 'bob', '1234'),
      (3, 'charlie', '1234');

    INSERT OR IGNORE INTO categories (id, name, image) VALUES
      (1, 'Electronics', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'),
      (2, 'Fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300'),
      (3, 'Home & Living', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300'),
      (4, 'Beauty', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300'),
      (5, 'Sports', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300');
  `);

  initialized = true;
}

export function getDatabase() {
  return database;
}
