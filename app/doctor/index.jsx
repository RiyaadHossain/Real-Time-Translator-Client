import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import GlobalStyles from "../../constants/GlobalStyles";
import { useEffect, useState } from "react";
import { getMe } from "../../lib/auth";

export default function DoctorHome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/auth/login");
          return;
        }

        const res = await getMe();
        if (!res.success) {
          router.replace("/auth/login");
          return;
        }

        const user = res.user;
        setUser(user);
      } catch (err) {
        console.error("Auth check failed:", err);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/");
  };

  if (isLoading) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>👨‍⚕️ Doctor Dashboard</Text>
      <Text style={GlobalStyles.subtitle}>Welcome back, {user?.name || "Doctor"}!</Text>

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => router.push("/translations/select-language")}
      >
        <Text style={GlobalStyles.buttonText}>Translate Real-Time</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={() => router.push("/translations")}
      >
        <Text style={GlobalStyles.buttonText}>View Translations</Text>
      </TouchableOpacity>

      <TouchableOpacity style={GlobalStyles.logoutButton} onPress={logout}>
        <Text style={GlobalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
