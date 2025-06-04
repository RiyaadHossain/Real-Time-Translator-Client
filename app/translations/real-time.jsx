import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAudioRecorder, AudioModule, RecordingPresets } from "expo-audio";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyles from "../../constants/GlobalStyles";
import { formatTime } from "../../utils/dateUtils";
import { uploadAudio } from "../../lib/audio";

import * as Speech from "expo-speech";
import { useLocalSearchParams } from "expo-router";
import { LANGUAGE_FLAGS, LANGUAGE_LABELS } from "../../constants/language";

const TranslationScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(null); // 'user1' or 'user2'

  const [isTranslating, setIsTranslating] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null); // holds interval ID

  const { user1Lang, user2Lang } = useLocalSearchParams();

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const toggleTranslation = async (speaker) => {
    if (!isRecording) {
      setIsRecording(true);
      setActiveSpeaker(speaker);
      const startTime = Date.now();

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      intervalRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return;
    }

    setIsRecording(false);
    setIsTranslating(true);
    setDuration(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    await audioRecorder.stop();
    const res = await uploadAudio(audioRecorder.uri, {
      fromLang: activeSpeaker === "user1" ? user1Lang : user2Lang,
      toLang: activeSpeaker === "user1" ? user2Lang : user1Lang,
    });

    setIsTranslating(false);
    if (!res.success) {
      Speech.speak("Sorry, I couldn't process your audio. Please try again.");
      return;
    }

    const translatedText = res?.data?.translatedText || "Translation failed";
    const toLang = res?.data?.toLang || (activeSpeaker === "user1" ? user2Lang : user1Lang);
    Speech.speak(translatedText, {language: toLang});

    setActiveSpeaker(null); // reset
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }
    })();
  }, []);

  const getMiddleContent = () => {
    if (isRecording)
      return (
        <>
          <View style={[styles.animationCircle]}>
            <Ionicons name="mic" size={60} color="#007aff" />
          </View>
          <Text style={styles.activeText}>Listening for translation...</Text>
        </>
      );

    if (isTranslating)
      return (
        <>
          <ActivityIndicator size="large" color="#007aff" />
          <Text style={styles.activeText}>Translating your speech...</Text>
        </>
      );

    return (
      <>
        <Ionicons name="mic" size={60} color="#ccc" style={styles.micIcon} />
        <Text style={styles.helpText}>
          Press the mic button to start real-time translation
        </Text>
      </>
    );
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      {/* Translation Time Indicator */}
      {isRecording && (
        <View style={styles.timeContainer}>
          <Text style={GlobalStyles.durationText}>{formatTime(duration)}</Text>
        </View>
      )}

      {/* Main Content Area */}
      <View style={styles.content}>{getMiddleContent()}</View>

      <View style={styles.languageRow}>
        <View style={styles.languageBox}>
          <Text style={styles.flag}>{LANGUAGE_FLAGS[user1Lang]}</Text>
          <Text style={styles.langInfo}>
            User 1 speaks: {LANGUAGE_LABELS[user1Lang]}
          </Text>
          <Text style={styles.langSub}>
            Translated to {LANGUAGE_LABELS[user2Lang]}
          </Text>
        </View>

        <View style={styles.languageBox}>
          <Text style={styles.flag}>{LANGUAGE_FLAGS[user2Lang]}</Text>
          <Text style={styles.langInfo}>
            User 2 speaks: {LANGUAGE_LABELS[user2Lang]}
          </Text>
          <Text style={styles.langSub}>
            Translated to {LANGUAGE_LABELS[user1Lang]}
          </Text>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.dualButtonContainer}>
        {/* User 1 Button */}
        <TouchableOpacity
          style={[
            GlobalStyles.button,
            styles.translateButton,
            isRecording && activeSpeaker === "user1" && styles.stopButton,
          ]}
          onPress={() => toggleTranslation("user1")}
          disabled={isTranslating || (isRecording && activeSpeaker === "user2")}
        >
          <Ionicons
            name={
              isRecording && activeSpeaker === "user1" ? "stop-circle" : "mic"
            }
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={GlobalStyles.buttonText}>User 1 Speak</Text>
        </TouchableOpacity>

        {/* User 2 Button */}
        <TouchableOpacity
          style={[
            GlobalStyles.button,
            styles.translateButton,
            isRecording && activeSpeaker === "user2" && styles.stopButton,
          ]}
          onPress={() => toggleTranslation("user2")}
          disabled={isTranslating || (isRecording && activeSpeaker === "user1")}
        >
          <Ionicons
            name={
              isRecording && activeSpeaker === "user2" ? "stop-circle" : "mic"
            }
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={GlobalStyles.buttonText}>User 2 Speak</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dualButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "90%",
    alignSelf: "center",
  },

  translateButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  stopButton: {
    backgroundColor: "#ff3b30",
  },

  container: {
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    position: "absolute",
    top: 40,
    right: 24,
    alignItems: "flex-end",
  },
  micIcon: {
    marginBottom: 20,
    opacity: 0.5,
  },
  helpText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 40,
  },
  activeText: {
    fontSize: 18,
    color: "#007aff",
    marginTop: 30,
    fontWeight: "500",
  },
  buttonIcon: {
    marginRight: 10,
  },
  animationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 10,
  },
  languageBox: {
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 48,
    marginBottom: 8,
  },
  langInfo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  langSub: {
    fontSize: 12,
    color: "#666",
  },
});

export default TranslationScreen;
