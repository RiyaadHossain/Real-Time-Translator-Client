import { Text, TouchableOpacity } from "react-native";
import GlobalStyles from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";

export default function Ringing({ callerName = "Dr. Smith" }) {

   const router = useRouter();
    const handleEndCall = () => { 
        // Logic to end the call
        alert("Call ended");
        router.push("/"); // Navigate back to home or previous screen
    }

  return (
    <>
      <Text style={GlobalStyles.title}>Calling...</Text>
      <Text style={[GlobalStyles.subTitle]}>{callerName}</Text>
      <TouchableOpacity style={GlobalStyles.endButton} onPress={handleEndCall}>
        <Text style={GlobalStyles.endButtonText}>End Call</Text>
      </TouchableOpacity>
    </>
  );
}
