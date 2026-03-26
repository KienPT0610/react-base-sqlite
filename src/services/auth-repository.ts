import { Category } from "@/src/models/category";
import { User } from "@/src/models/user";
import { getDatabase, initializeDatabase } from "@/src/services/database";

export async function register(
  username: string,
  password: string,
): Promise<number> {
  await initializeDatabase();
  const db = getDatabase();
  const result = await db.runAsync(
    "INSERT INTO users (username, password) VALUES (?, ?);",
    [username.trim(), password],
  );

  return result.lastInsertRowId;
}

export async function login(
  username: string,
  password: string,
): Promise<User | null> {
  await initializeDatabase();
  const db = getDatabase();
  const row = await db.getFirstAsync<User>(
    "SELECT id, username, password FROM users WHERE username = ? AND password = ? LIMIT 1;",
    [username.trim(), password],
  );

  return row ?? null;
}

export async function getCategories(): Promise<Category[]> {
  await initializeDatabase();
  const db = getDatabase();

  return db.getAllAsync<Category>(
    "SELECT id, name, image FROM categories ORDER BY id ASC;",
  );
}
