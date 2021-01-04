import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Text, View, StyleSheet } from "react-native";
import theme from "../../styles/theme";
const { colors } = theme;

interface PickerInputProps {
  accessibilityLabel: string;
  value: string;
  children: React.ReactNode;
  onValueChange: (itemValue: string | number, itemIndex: number) => void;
}

export default function PickerInput({
  accessibilityLabel,
  value,
  children,
  onValueChange,
}: PickerInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        itemStyle={styles.item}
      >
        {children}
      </Picker>
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
  item: {
    fontSize: 18,
  },
});
