import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AuthController } from "@/src/controllers/auth-controller";
import { Category } from "@/src/models/category";

export default function CategoryListView() {
  const controller = useMemo(() => new AuthController(), []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await controller.categories();
        setCategories(data);
      } catch {
        Alert.alert("Lỗi", "Không thể tải danh mục sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [controller]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Categories</ThemedText>
      <ThemedText style={styles.subtitle}>
        Danh sách danh mục sản phẩm
      </ThemedText>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<ThemedText>Chưa có danh mục nào.</ThemedText>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <ThemedText>{item.name}</ThemedText>
            </View>
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
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
});
