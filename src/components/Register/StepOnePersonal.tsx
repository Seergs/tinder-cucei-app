import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from "../Input/TextInput";
import DateInput from "../Input/DateInput";
import PickerInput from "../Input/PickerInput";

interface PersonalProps {
  values: {
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function Personal({
  values: { firstName, lastName, birthday, gender },
  onChange,
}: PersonalProps) {
  return (
    <View style={styles.form}>
      <TextInput
        accessibilityLabel="Nombre"
        value={firstName}
        name="firstName"
        onChange={onChange}
      />
      <TextInput
        accessibilityLabel="Apellido"
        name="lastName"
        value={lastName}
        onChange={onChange}
      />
      <DateInput
        accessibilityLabel="Birthday"
        name="birthday"
        value={birthday}
        onChange={onChange}
      />
      <PickerInput
        accessibilityLabel="Sexo"
        name="gender"
        value={gender}
        onChange={onChange}
      >
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
