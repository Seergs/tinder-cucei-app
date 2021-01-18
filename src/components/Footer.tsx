import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

import theme from "../styles/theme";
const { colors } = theme;

type FooterProps = {
  onOpenBottomSheet: () => void;
};

export default function Footer({ onOpenBottomSheet }: FooterProps) {
  const { navigate } = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("People")}
      >
        <AntDesign
          name={route.name === "People" ? "clockcircle" : "clockcircleo"}
          size={22}
          color={
            route.name === "People" ? colors.primaryOrange : colors.textGray
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("Matches")}
      >
        <AntDesign
          name={route.name === "Matches" ? "heart" : "hearto"}
          size={22}
          color={
            route.name === "Matches" ? colors.primaryOrange : colors.textGray
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("Messages")}
      >
        <AntDesign name="message1" size={22} color={colors.textGray} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("Profile")}
      >
        <AntDesign name="user" size={22} color={colors.textGray} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpenBottomSheet} style={styles.button}>
        <AntDesign name="ellipsis1" size={22} color={colors.textGray} />
      </TouchableOpacity>
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
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
