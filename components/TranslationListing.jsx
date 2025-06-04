import GlobalStyles from "@/constants/GlobalStyles";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { history as fetchTranslationHistory } from "../lib/translation";
import { formatCallDate, formatDuration } from "../utils/dateUtils";
import { LANGUAGE_LABELS } from "../constants/language";

export default function TranslationScreen() {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchTranslationHistory();
        setTranslations(data.translations);
      } catch (err) {
        setError(err.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  if (loading) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[GlobalStyles.container, { paddingTop: 24 }]}>
      <Text style={GlobalStyles.title}>Translations</Text>
      {translations?.length === 0 ? (
        <Text style={{ marginTop: 24, color: "#888", fontSize: 16 }}>
          No translations found.
        </Text>
      ) : (
        <FlatList
          data={translations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={GlobalStyles.cardWithAvatar}>
              <View style={GlobalStyles.avatar}>
                <Text style={GlobalStyles.avatarText}>
                  {LANGUAGE_LABELS[item.toLang]?.charAt(0)}
                </Text>
              </View>
              <View style={[GlobalStyles.cardContent, { flex: 2 }]}>
                <Text style={GlobalStyles.cardTitle}>
                  {LANGUAGE_LABELS[item.fromLang]} - {LANGUAGE_LABELS[item.toLang]}
                </Text>
                {/* <Text style={GlobalStyles.emailText}>{item.userEmail}</Text> */}
                <Text style={[GlobalStyles.cardInfo, { marginTop: 8 }]}>
                  {formatCallDate(item.date)}
                </Text>
              </View>
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <Text style={[GlobalStyles.cardTitle, { color: "#007aff" }]}>
                  {formatDuration(item.duration)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
