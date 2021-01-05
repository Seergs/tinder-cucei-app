import React from "react";
import { View, StyleSheet, Text, TextInput as RNTextInput } from "react-native";
import theme from "../../styles/theme";
import { Controller, Control } from "react-hook-form";
const { colors } = theme;

interface TextInputProps {
  accessibilityLabel: string;
  name: string;
  defaultValue?: string;
  control: Control;
}

export default function TextInput({
  accessibilityLabel,
  name,
  defaultValue = "",
  control,
}: TextInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ onChange, value }) => (
          <RNTextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => onChange(text)}
            accessibilityLabel={accessibilityLabel}
          />
        )}
      />
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
