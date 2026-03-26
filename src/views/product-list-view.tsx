import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ProductController } from "@/src/controllers/product-controller";
import { Product } from "@/src/models/product";

interface Props {
  categoryId: string;
}

export default function ProductListView({ categoryId }: Props) {
  const controller = useMemo(() => new ProductController(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await controller.getProductsByCategory(categoryId);
        setProducts(data);
      } catch (error: any) {
        Alert.alert("Lỗi", error.message || "Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryId, controller]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sản phẩm</ThemedText>
      <ThemedText style={styles.subtitle}>
        Danh sách sản phẩm theo danh mục
      </ThemedText>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<ThemedText>Chưa có sản phẩm nào.</ThemedText>}
          renderItem={({ item }) => (
            <Link href={`/product/${item.id}` as any} asChild>
              <TouchableOpacity>
                <View style={styles.item}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.details}>
                    <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                    <ThemedText style={styles.price}>${item.price.toFixed(2)}</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  subtitle: {
    opacity: 0.7,
  },
  list: {
    gap: 8,
    paddingBottom: 24,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  details: {
    flex: 1,
    gap: 4,
  },
  price: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
});
