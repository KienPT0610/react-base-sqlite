import { useLocalSearchParams } from "expo-router";
import ProductDetailView from "@/src/views/product-detail-view";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <ProductDetailView productId={id} />;
}
