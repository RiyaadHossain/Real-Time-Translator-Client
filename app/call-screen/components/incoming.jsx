import { Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";

export default function Incoming({ callerName = "Dr. Smith" }) {
  const router = useRouter();
  const handleEndCall = () => {
    // Logic to end the call
    alert("Call declined");
    router.push("/"); // Navigate back to home or previous screen
  };

  const handleAcceptCall = () => {
    // Logic to accept the call
    alert("Call accepted");
    router.push({
      pathname: "/call-screen",
      params: {
        callerName: "James Bond",
        callStatus: "active"
      },
    }); // Navigate to active call screen
  };

  return (
    <>
      <Text style={GlobalStyles.title}>{callerName} is calling you</Text>
      <View style={GlobalStyles.incomingButtons}>
        <TouchableOpacity
          style={GlobalStyles.rejectButton}
          onPress={handleEndCall}
        >
          <Text style={GlobalStyles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={GlobalStyles.acceptButton}
          onPress={handleAcceptCall}
        >
          <Text style={GlobalStyles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
