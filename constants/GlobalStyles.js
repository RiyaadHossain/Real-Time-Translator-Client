import { StyleSheet } from "react-native";
// import { Colors } from "./Colors";
// import Fonts from "./Fonts";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007aff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  linkText: {
    fontSize: 16,
    color: "#007aff",
    textAlign: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007aff",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 5,
    alignItems: "center",
  },
  roleSelected: {
    backgroundColor: "#007aff",
  },
  roleText: {
    color: "#000",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  logoutText: {
    color: "#ff3b30",
    fontSize: 16,
  },
  emailText: {
    fontSize: 14,
    color: "#007aff",
    marginTop: 4,
  },

  /* Card Design */
  cardWithAvatar: {
    flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#f9f9fb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  cardInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  /* Call Screen */
  callContainer: {
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 24,
    backgroundColor: "#f0f0f0",
  },


  endButton: {
    backgroundColor: "#ff3b30",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 40,
  },

  endButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  incomingButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 40,
  },

  acceptButton: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },

  rejectButton: {
    backgroundColor: "#ff3b30",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: "center",
  },

// Add duration text style if needed
durationText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#007aff',
},
});

export default GlobalStyles;
