import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ProductController } from "@/src/controllers/product-controller";
import { Product } from "@/src/models/product";

interface Props {
  productId: string;
}

export default function ProductDetailView({ productId }: Props) {
  const controller = useMemo(() => new ProductController(), []);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await controller.getProduct(productId);
        setProduct(data);
      } catch (error: any) {
        Alert.alert("Lỗi", error.message || "Không thể tải chi tiết sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId, controller]);

  const handleAddToCart = () => {
    // Add logic to Cart repository here when available
    Alert.alert("Thành công", `Đã nhặt hàng: ${product?.name}`);
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!product) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Sản phẩm không tồn tại.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <ThemedText type="title">{product.name}</ThemedText>
          <ThemedText style={styles.price}>${product.price.toFixed(2)}</ThemedText>
          <ThemedText style={styles.description}>{product.description}</ThemedText>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <ThemedText style={styles.buttonText}>Nhặt hàng</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#eee",
  },
  infoContainer: {
    padding: 16,
    gap: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e91e63",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
