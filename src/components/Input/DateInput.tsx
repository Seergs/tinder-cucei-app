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
import { Controller, Control } from "react-hook-form";
import theme from "../../styles/theme";
import DatePicker from "../DatePicker";
const { colors } = theme;

interface DateInputProps {
  accessibilityLabel: string;
  name: string;
  control: Control;
}

export default function DateInput({
  accessibilityLabel,
  control,
  name,
}: DateInputProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (
    reactHookFormHandler: (...event: any[]) => void,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || new Date();
    setIsDatePickerOpen(Platform.OS === "ios");
    reactHookFormHandler(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <View style={styles.inputContainer}>
        <Controller
          name={name}
          control={control}
          render={({ onChange, value }) => (
            <>
              <DatePicker
                isOpen={isDatePickerOpen}
                value={value}
                onDateChange={(_, selectedDate) =>
                  handleDateChange(onChange, selectedDate)
                }
              />
              <TextInput
                value={value}
                accessibilityLabel={accessibilityLabel}
                style={styles.input}
              />
            </>
          )}
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
  },
  input: {
    color: colors.textBlack,
    fontSize: 18,
  },
});
