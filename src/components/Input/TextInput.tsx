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
  secureTextEntry?: boolean;
  keyboardType?: any;
  hasError: boolean;
  onChange: (key: string, newValue: any) => void;
}

export default function TextInput({
  hasError,
  name,
  type = null,
  onChange,
  accessibilityLabel,
  ...rest
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
        style={[
          styles.input,
          inputStyles,
          {
            borderColor: colors.error,
            borderWidth: hasError ? 1 : 0,
          },
        ]}
        onChangeText={(text) => onChange(name, text)}
        accessibilityLabel={accessibilityLabel}
        multiline={type === "textarea"}
        numberOfLines={type === "textarea" ? 10 : undefined}
        {...rest}
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
