import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import GlobalStyles from "@/constants/GlobalStyles";
import { register } from "../../lib/auth";

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!email || !password || !role) {
      setError("Please fill out all fields");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role,
    };

    try {
      const res = (await register(userData));

      if (!res.success) {
        setError(res.message || "Signup failed. Please try again.");
        return;
      }
      router.replace(`/${role}`);
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Sign Up</Text>

      <TextInput
        style={GlobalStyles.input}
        placeholder="Name"
        autoCapitalize="none"
        keyboardType="name-address"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={GlobalStyles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={GlobalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={GlobalStyles.label}>Select Role:</Text>
      <View style={GlobalStyles.roleContainer}>
        <TouchableOpacity
          style={[
            GlobalStyles.roleButton,
            role === "doctor" && GlobalStyles.roleSelected,
          ]}
          onPress={() => setRole("doctor")}
        >
          <Text style={GlobalStyles.roleText}>Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            GlobalStyles.roleButton,
            role === "patient" && GlobalStyles.roleSelected,
          ]}
          onPress={() => setRole("patient")}
        >
          <Text style={GlobalStyles.roleText}>Patient</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={{ color: "red", marginHorizontal: 16 }}>{error}</Text>
      ) : null}
      <TouchableOpacity style={GlobalStyles.button} onPress={handleSignup}>
        <Text style={GlobalStyles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={GlobalStyles.linkText}>
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
