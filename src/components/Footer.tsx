import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

import theme from "../styles/theme";
const { colors } = theme;

export default function Footer() {
  const { navigate } = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <AntDesign
        name={route.name === "People" ? "clockcircle" : "clockcircleo"}
        size={22}
        color={route.name === "People" ? colors.primaryOrange : colors.textGray}
        onPress={() => navigate("People")}
      />
      <AntDesign
        name={route.name === "Matches" ? "heart" : "hearto"}
        size={22}
        color={
          route.name === "Matches" ? colors.primaryOrange : colors.textGray
        }
        onPress={() => navigate("Matches")}
      />
      <AntDesign
        name="message1"
        size={22}
        color={colors.textGray}
        onPress={() => navigate("Messages")}
      />
      <AntDesign
        name="user"
        size={22}
        color={colors.textGray}
        onPress={() => navigate("Profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 15,
  },
});
