import AsyncStorage from "@react-native-async-storage/async-storage";

import { Category } from "@/src/models/category";
import { LoginInput, RegisterInput, User } from "@/src/models/user";
import { getCategories, login, register } from "@/src/services/auth-repository";

const AUTH_USER_ID_KEY = "userId";
const AUTH_IS_LOGGED_IN_KEY = "isLoggedIn";

export type AuthState = {
  userId: number | null;
  isLoggedIn: boolean;
};

export class AuthController {
  async register(input: RegisterInput): Promise<number> {
    const username = input.username.trim();
    const password = input.password;

    if (!username) {
      throw new Error("Username không được để trống");
    }

    if (password.length < 4) {
      throw new Error("Password phải có ít nhất 4 ký tự");
    }

    return register(username, password);
  }

  async login(input: LoginInput): Promise<User> {
    const username = input.username.trim();
    const password = input.password;

    if (!username) {
      throw new Error("Username không được để trống");
    }

    if (!password) {
      throw new Error("Password không được để trống");
    }

    const user = await login(username, password);
    if (!user) {
      throw new Error("Sai username hoặc password");
    }

    await AsyncStorage.multiSet([
      [AUTH_USER_ID_KEY, String(user.id)],
      [AUTH_IS_LOGGED_IN_KEY, "true"],
    ]);

    return user;
  }

  async categories(): Promise<Category[]> {
    return getCategories();
  }
}

export async function checkAuth(): Promise<AuthState> {
  const values = await AsyncStorage.multiGet([
    AUTH_USER_ID_KEY,
    AUTH_IS_LOGGED_IN_KEY,
  ]);
  const userIdRaw =
    values.find(([key]) => key === AUTH_USER_ID_KEY)?.[1] ?? null;
  const isLoggedInRaw =
    values.find(([key]) => key === AUTH_IS_LOGGED_IN_KEY)?.[1] ?? "false";

  const userId = userIdRaw ? Number(userIdRaw) : null;
  const isLoggedIn =
    isLoggedInRaw === "true" && Number.isFinite(userId) && userId !== null;

  return {
    userId: isLoggedIn ? userId : null,
    isLoggedIn,
  };
}
