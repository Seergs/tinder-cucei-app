import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Text, View, StyleSheet } from "react-native";
import theme from "../../styles/theme";
const { colors } = theme;

interface PickerInputProps {
  accessibilityLabel: string;
  name: string;
  value: string;
  children: React.ReactNode;
  onChange: (key: string, newValue: any) => void;
}

export default function PickerInput({
  accessibilityLabel,
  name,
  value,
  children,
  onChange,
}: PickerInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(value) => onChange(name, value.toString())}
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
