import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../styles/theme";
const { colors } = theme;

type ButtonProps = {
  type: "dislike" | "like";
};

export default function SwipeButton({ type }: ButtonProps) {
  if (type === "like")
    return (
      <TouchableOpacity style={[styles.button, styles.like]}>
        <AntDesign
          name="check"
          size={26}
          color="white"
          style={{ position: "relative", left: -18 }}
        />
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity style={[styles.button, styles.dislike]}>
      <AntDesign
        name="close"
        size={26}
        color="white"
        style={{ position: "relative", right: -18 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  like: {
    top: "50%",
    right: -50,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryOrange,
  },
  dislike: {
    top: "50%",
    left: -50,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.textBlack,
  },
});
