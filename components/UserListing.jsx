import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import GlobalStyles from "@/constants/GlobalStyles";


export default function UserListing({users,title}) {
  const router = useRouter();
  const handleStartCall = (user) => {
    alert(`Starting call with ${user.name}`);
    router.push({
      pathname: "/call-screen",
      params: {
        callerName: user.name,
        callStatus: "ringing"
      },
    });
  };

  return (
    <View style={[GlobalStyles.container, { paddingTop: 50 }]}>
          <Text style={GlobalStyles.title}>{ title}</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={GlobalStyles.cardWithAvatar}>
            <View style={GlobalStyles.avatar}>
              <Text style={GlobalStyles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={GlobalStyles.cardContent}>
              <Text style={GlobalStyles.cardTitle}>{item.name}</Text>
              <Text style={GlobalStyles.cardInfo}>Age: {item.age}</Text>
              <Text style={GlobalStyles.cardInfo}>Gender: {item.gender}</Text>
              <Text style={GlobalStyles.emailText}>Email: {item.email}</Text>
              <TouchableOpacity
                onPress={() => handleStartCall(item)}
                style={GlobalStyles.button}
              >
                <Text style={GlobalStyles.buttonText}>Start Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
