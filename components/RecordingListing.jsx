import { View, Text, FlatList } from "react-native";
import GlobalStyles from "@/constants/GlobalStyles";
import { formatCallDate, formatDuration } from "../utils/dateUtils";


export default function CallRecordingScreen({callRecordings}) {
  return (
    <View style={[GlobalStyles.container, { paddingTop: 24 }]}>
      <Text style={GlobalStyles.title}>Call Recordings</Text>
      
      <FlatList
        data={callRecordings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={GlobalStyles.cardWithAvatar}>
            <View style={GlobalStyles.avatar}>
              <Text style={GlobalStyles.avatarText}>
                {item.userName.charAt(0)}
              </Text>
            </View>
            
            <View style={[GlobalStyles.cardContent, { flex: 2 }]}>
              <Text style={GlobalStyles.cardTitle}>{item.userName}</Text>
              {/* <Text style={GlobalStyles.emailText}>{item.userEmail}</Text> */}
              <Text style={[GlobalStyles.cardInfo, { marginTop: 8 }]}>
                {formatCallDate(item.date)}
              </Text>
            </View>
            
            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={[GlobalStyles.cardTitle, { color: '#007aff' }]}>
                {formatDuration(item.duration)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}