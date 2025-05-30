import { View, Text } from "react-native";
import GlobalStyles from "@/constants/GlobalStyles";
import Ringing from "./components/ringing";
import Incoming from "./components/incoming";
import Active from "./components/active";
import { useLocalSearchParams } from "expo-router";

export default function CallScreen({
  callStatus = "incoming",
  callerName = "Dr. Smith",
}) {


  // Get params from URL
  const params = useLocalSearchParams();
  
  // Set defaults from params or fallback
  callStatus = params.callStatus || "incoming";
  callerName = params.callerName || "Dr. Smith";

  const renderContent = () => {
    switch (callStatus) {
      case "ringing":
        return <Ringing callerName={callerName} />;
      case "incoming":
        return <Incoming callerName={callerName} />;
      case "active":
        return <Active callerName={callerName} />;
      default:
        return null;
    }
  };

  return (
    <View style={[GlobalStyles.container, GlobalStyles.callContainer, {paddingHorizontal: 0}]}>
      {/* Placeholder Avatar */}
      {callStatus !== "active" && <View style={[GlobalStyles.avatar, { marginBottom: 20 }]}>
        <Text style={GlobalStyles.avatarText}>{callerName.charAt(0)}</Text>
      </View>}
      {renderContent()}
    </View>
  );
}
