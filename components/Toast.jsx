import { useEffect, useRef } from "react";
import { Text, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Toast({ visible, message, type = "info", onHide }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Hide after 3s
      const timeout = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide?.(); // optional chaining
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [visible, opacity, onHide]);

  if (!visible) return null;

  const backgroundColors = {
    success: "#4BB543",
    error: "#FF4C4C",
    info: "#2D9CDB",
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: backgroundColors[type] || "#2D9CDB", opacity },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 50,
    left: width * 0.1,
    right: width * 0.1,
    padding: 12,
    borderRadius: 10,
    zIndex: 9999,
    elevation: 4,
  },
  text: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
});
