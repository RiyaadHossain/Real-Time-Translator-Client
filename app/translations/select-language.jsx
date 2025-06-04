import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";
import { storeTranslation } from "../../lib/translation";

const SelectLanguageScreen = () => {
  const [user1Lang, setUser1Lang] = useState("en");
  const [user2Lang, setUser2Lang] = useState("bn");
  const router = useRouter();

  const handleContinue = async () => {
    try {
      await storeTranslation({ fromLang: user1Lang, toLang: user2Lang });
      
      router.push({
        pathname: "/translations/real-time",
        params: { user1Lang, user2Lang },
      });
    } catch (error) {
      // You can show a toast or alert here if you want
      console.error("Error storing translation:", error.message);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Select Languages</Text>

      <View style={styles.selectorContainer}>
        <Text style={GlobalStyles.label}>User 1 Language</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={user1Lang}
            onValueChange={(itemValue) => setUser1Lang(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Bengali" value="bn" />
            <Picker.Item label="Hindi" value="hi" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            {/* Add more languages as needed */}
          </Picker>
        </View>

        <Text style={GlobalStyles.label}>User 2 Language</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={user2Lang}
            onValueChange={(itemValue) => setUser2Lang(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Bengali" value="bn" />
            <Picker.Item label="Hindi" value="hi" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            {/* Add more languages as needed */}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={GlobalStyles.button} onPress={handleContinue}>
        <Text style={GlobalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    marginBottom: 32,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
});

export default SelectLanguageScreen;
