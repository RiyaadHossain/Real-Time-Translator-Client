import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);

  const token = res.data.token;
  await AsyncStorage.setItem("token", token);
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post("/auth/register", userData);

  const token = res.data.token;
  await AsyncStorage.setItem("token", token);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
