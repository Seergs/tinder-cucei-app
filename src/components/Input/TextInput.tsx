import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  StyleProp,
  TextStyle,
} from "react-native";
import theme from "../../styles/theme";
const { colors } = theme;

interface TextInputProps {
  accessibilityLabel: string;
  value: string;
  name: string;
  type?: string | null;
  defaultValue?: string;
  placeholder?: string;
  onChange: (key: string, newValue: any) => void;
}

export default function TextInput({
  accessibilityLabel,
  value,
  name,
  placeholder = "",
  type = null,
  onChange,
}: TextInputProps) {
  const inputStyles: StyleProp<TextStyle> =
    type === "textarea"
      ? {
          textAlignVertical: "top",
          paddingVertical: 20,
        }
      : { height: 60 };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <RNTextInput
        style={[styles.input, inputStyles]}
        value={value}
        onChangeText={(text) => onChange(name, text)}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel}
        multiline={type === "textarea"}
        numberOfLines={type === "textarea" ? 10 : undefined}
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
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 8,
    paddingRight: 8,
    color: colors.textBlack,
  },
});
