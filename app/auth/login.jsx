import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import GlobalStyles from "../../constants/GlobalStyles";
import { login } from "../../lib/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      if (!email || !password) {
        setError("Please fill out all fields");
        return;
      }

      const res = (await login({ email, password }));
      if (!res.success) {
        setError(res.message || "Signup failed. Please try again.");
        return;
      }

      router.replace("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Log In</Text>

      <TextInput
        style={GlobalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={GlobalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? (
        <Text style={{ color: "red", marginHorizontal: 16 }}>{error}</Text>
      ) : null}
      <TouchableOpacity onPress={handleLogin} style={GlobalStyles.button}>
        <Text style={GlobalStyles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={GlobalStyles.linkText}>
          {"Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
