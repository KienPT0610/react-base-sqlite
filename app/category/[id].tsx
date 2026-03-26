import { useLocalSearchParams } from "expo-router";
import ProductListView from "@/src/views/product-list-view";

export default function CategoryProductsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <ProductListView categoryId={id} />;
}
