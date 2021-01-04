import React from "react";
import { View, StyleSheet, Text, TextInput as RNTextInput } from "react-native";
import theme from "../../styles/theme";
const { colors } = theme;

interface TextInputProps {
  accessibilityLabel: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function TextInput(props: TextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.accessibilityLabel}</Text>
      <RNTextInput {...props} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.textDarkGray,
  },
  input: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 8,
    paddingRight: 8,
    color: colors.textBlack,
  },
});
