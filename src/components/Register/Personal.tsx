import React from "react";
import { View, StyleSheet } from "react-native";
import { Control } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import TextInput from "../Input/TextInput";
import DateInput from "../Input/DateInput";
import PickerInput from "../Input/PickerInput";

interface PersonalProps {
  control: Control;
}

export default function Personal({ control }: PersonalProps) {
  return (
    <View style={styles.form}>
      <TextInput accessibilityLabel="Nombre" control={control} name="name" />
      <TextInput
        accessibilityLabel="Apellido"
        control={control}
        name="lastname"
      />
      <DateInput
        accessibilityLabel="birthday"
        name="birthday"
        control={control}
      />
      <PickerInput accessibilityLabel="Sexo" control={control} name="gender">
        <Picker.Item label="Hombre" value="m" />
        <Picker.Item label="Mujer" value="f" />
      </PickerInput>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
});
