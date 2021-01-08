import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../../styles/theme";

const { colors } = theme;

interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return <Text style={styles.text}>* {message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    position: "relative",
    top: -15,
    color: colors.error,
    fontWeight: "bold",
  },
});
