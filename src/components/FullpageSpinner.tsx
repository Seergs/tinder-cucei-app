import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import theme from "../styles/theme";
const { colors } = theme;

export default function FullpageSpinner() {
  return (
    <View style={styles.root}>
      <ActivityIndicator color={colors.textBlack} size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
