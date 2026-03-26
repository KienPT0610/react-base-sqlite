import { Product } from '@/src/models/product';
import { getDatabase, initializeDatabase } from '@/src/services/database';

function mapProduct(row: {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
}): Product {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    description: row.description,
    image: row.image,
    categoryId: row.category_id,
  };
}

export async function getProductsByCategoryId(categoryId: number): Promise<Product[]> {
  await initializeDatabase();
  const db = getDatabase();
  const rows = await db.getAllAsync<{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category_id: number;
  }>(
    'SELECT id, name, price, description, image, category_id FROM products WHERE category_id = ? ORDER BY id ASC;',
    [categoryId]
  );

  return rows.map(mapProduct);
}

export async function getProductDetail(productId: number): Promise<Product | null> {
  await initializeDatabase();
  const db = getDatabase();
  const row = await db.getFirstAsync<{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category_id: number;
  }>(
    'SELECT id, name, price, description, image, category_id FROM products WHERE id = ? LIMIT 1;',
    [productId]
  );

  return row ? mapProduct(row) : null;
}
