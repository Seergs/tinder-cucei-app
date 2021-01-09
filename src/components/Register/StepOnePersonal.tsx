import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from "../Input/TextInput";
import DateInput from "../Input/DateInput";
import PickerInput from "../Input/PickerInput";
import Error from "./Error";

interface PersonalProps {
  values: {
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
  };
  errors: {
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    birthday: string | null | undefined;
    gender: string | null | undefined;
  };
  onChange: (key: string, value: string) => void;
}

export default function Personal({
  values: { firstName, lastName, birthday, gender },
  errors,
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
      {errors.firstName && <Error message={errors.firstName} />}
      <TextInput
        accessibilityLabel="Apellido"
        name="lastName"
        value={lastName}
        onChange={onChange}
      />
      {errors.lastName && <Error message={errors.lastName} />}
      <DateInput
        accessibilityLabel="Fecha de nacimiento"
        name="birthday"
        value={birthday}
        onChange={onChange}
      />
      {errors.birthday && <Error message={errors.birthday} />}
      <PickerInput
        accessibilityLabel="Sexo"
        name="gender"
        value={gender}
        onChange={onChange}
      >
        <Picker.Item label="Hombre" value="m" />
        <Picker.Item label="Mujer" value="f" />
      </PickerInput>
      {errors.gender && <Error message={errors.gender} />}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
});
