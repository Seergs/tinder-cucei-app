import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../styles/theme";
const { colors } = theme;

export default function NextButton() {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={[colors.primaryOrange, colors.primaryPink]}
        style={styles.button}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <AntDesign name="arrowright" size={25} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
