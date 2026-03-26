import { Product } from '@/src/models/product';
import { getProductDetail, getProductsByCategoryId } from '@/src/services/product-repository';

export class ProductController {
  async getProductsByCategory(categoryIdStr: string | string[]): Promise<Product[]> {
    const categoryId = Number(categoryIdStr);
    if (isNaN(categoryId)) {
      throw new Error("Invalid category ID");
    }
    return getProductsByCategoryId(categoryId);
  }

  async getProduct(productIdStr: string | string[]): Promise<Product> {
    const productId = Number(productIdStr);
    if (isNaN(productId)) {
      throw new Error("Invalid product ID");
    }
    const product = await getProductDetail(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
