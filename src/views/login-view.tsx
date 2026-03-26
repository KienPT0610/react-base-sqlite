import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AuthController } from "@/src/controllers/auth-controller";

export default function LoginView() {
  const controller = useMemo(() => new AuthController(), []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập username.");
      return;
    }

    if (!password) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập password.");
      return;
    }

    setLoading(true);
    try {
      const user = await controller.login({
        username: trimmedUsername,
        password,
      });
      Alert.alert(
        "Thành công",
        `Đăng nhập thành công. Xin chào ${user.username}!`,
      );
      setPassword("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Đăng nhập thất bại.";
      Alert.alert("Lỗi", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      <ThemedText style={styles.subtitle}>
        Nhập tài khoản để tiếp tục
      </ThemedText>

      <View style={styles.form}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
      </View>

      <Pressable style={styles.button} onPress={onLogin} disabled={loading}>
        <ThemedText>{loading ? "Đang xử lý..." : "Đăng nhập"}</ThemedText>
      </Pressable>
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
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
});
