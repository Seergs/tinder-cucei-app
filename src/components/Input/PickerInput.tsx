import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Text, View, StyleSheet } from "react-native";
import { Controller, Control } from "react-hook-form";
import theme from "../../styles/theme";
const { colors } = theme;

interface PickerInputProps {
  accessibilityLabel: string;
  control: Control;
  name: string;
  children: React.ReactNode;
}

export default function PickerInput({
  accessibilityLabel,
  name,
  control,
  children,
}: PickerInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{accessibilityLabel}</Text>
      <Controller
        name={name}
        control={control}
        defaultValue="m"
        render={({ onChange, value }) => (
          <Picker
            selectedValue={value}
            onValueChange={(value) => onChange(value)}
            itemStyle={styles.item}
          >
            {children}
          </Picker>
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
  item: {
    fontSize: 18,
  },
});
