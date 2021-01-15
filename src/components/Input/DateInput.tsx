import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../styles/theme";
import DatePicker from "../DatePicker";
const { colors } = theme;

interface DateInputProps {
  accessibilityLabel: string;
  name: string;
  value: Date;
  hasError: boolean;
  onChange: (key: string, newValue: any) => void;
}

export default function DateInput({
  accessibilityLabel,
  name,
  value,
  hasError,
  onChange,
}: DateInputProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setIsDatePickerOpen(Platform.OS === "ios");
    onChange(name, currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <View style={{ ...styles.inputContainer, borderWidth: hasError ? 1 : 0 }}>
        <DatePicker
          isOpen={isDatePickerOpen}
          value={value}
          onDateChange={(_, selectedDate) => handleDateChange(selectedDate)}
        />
        <TextInput
          value={value.toDateString()}
          accessibilityLabel={accessibilityLabel}
          style={styles.input}
        />
        <TouchableHighlight
          onPress={() => setIsDatePickerOpen(true)}
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
    borderColor: colors.error,
  },
  input: {
    color: colors.textBlack,
    fontSize: 18,
  },
});
