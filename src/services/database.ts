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

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      category_id INTEGER,
      FOREIGN KEY(category_id) REFERENCES categories(id)
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

    INSERT OR IGNORE INTO products (id, name, price, description, image, category_id) VALUES
      (1, 'Smartphone X', 999.99, 'Latest flagship smartphone.', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', 1),
      (2, 'Laptop Pro', 1299.99, 'High performance laptop.', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', 1),
      (3, 'Wireless Earbuds', 149.99, 'Noise cancelling earbuds.', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300', 1),
      (4, 'Classic T-Shirt', 19.99, '100% cotton t-shirt.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', 2),
      (5, 'Denim Jeans', 49.99, 'Comfortable slim-fit jeans.', 'https://images.unsplash.com/photo-1542272604-780211754024?w=300', 2),
      (6, 'Coffee Maker', 89.99, 'Brew your morning coffee easily.', 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300', 3),
      (7, 'Desk Lamp', 34.99, 'Adjustable LED desk lamp.', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300', 3),
      (8, 'Moisturizer Face Cream', 25.99, 'Hydrating face cream.', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300', 4),
      (9, 'Organic Shampoo', 18.50, 'Sulfate-free natural shampoo.', 'https://images.unsplash.com/photo-1556228720-1c2a0b12ec09?w=300', 4),
      (10, 'Yoga Mat', 29.99, 'Non-slip exercise mat.', 'https://images.unsplash.com/photo-1599435640232-a5ec0d740f90?w=300', 5),
      (11, 'Running Shoes', 89.99, 'Lightweight running shoes.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', 5);
  `);

  initialized = true;
}

export function getDatabase() {
  return database;
}
