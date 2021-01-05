import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../styles/theme";
const { colors } = theme;

interface DateInputProps {
  accessibilityLabel: string;
  value: string;
  onPress: () => void;
}

export default function DateInput({
  accessibilityLabel,
  value,
  onPress,
}: DateInputProps) {
  const inputProps = {
    accessibilityLabel,
    value,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <View style={styles.inputContainer}>
        <TextInput {...inputProps} style={styles.input} />
        <TouchableHighlight
          onPress={onPress}
          accessibilityHint="Open date picker"
          activeOpacity={0.6}
          underlayColor={colors.textLightGray}
        >
          <AntDesign name="calendar" size={20} color={colors.textGray} />
        </TouchableHighlight>
      </View>
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
  inputContainer: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    color: colors.textBlack,
    fontSize: 18,
  },
});
