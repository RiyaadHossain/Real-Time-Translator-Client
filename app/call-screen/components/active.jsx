import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Active({
  callerName = "Dr. Smith",
  status = "active",
}) {
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (status === "active") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
    
    const router = useRouter();
    const handleEndCall = () => { 
        // Logic to end the call
        alert("Call ended");
        router.push("/"); // Navigate back to home or previous screen
    }

  return (
    <View style={styles.container}>
      {/* Main video stream */}
      <View style={styles.videoArea}>
        <Text style={styles.videoPlaceholder}>[Remote Video Stream]</Text>
      </View>

      {/* Small self-view window (picture-in-picture) */}
      <View style={styles.selfView}>
        <Text style={styles.selfViewPlaceholder}>[Your Camera]</Text>
      </View>

      {/* Overlay controls */}
      <View style={styles.overlay}>
        <Text style={styles.timerText}>{formatTime(callDuration)}</Text>
        <Text style={styles.callerName}>Talking to {callerName}</Text>
        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <Text style={styles.endCallText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#000",
    width: "100%",
  },
  videoArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlaceholder: {
    color: "#888",
    fontSize: 18,
  },
  selfView: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  selfViewPlaceholder: {
    color: '#aaa',
    fontSize: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  timerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  callerName: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 20,
  },
  endCallButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 40,
  },
  endCallText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});