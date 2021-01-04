import { StyleSheet, Platform, StatusBar } from "react-native";

const globalStyles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "pink",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default globalStyles;
