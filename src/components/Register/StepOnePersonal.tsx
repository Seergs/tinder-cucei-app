import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from "../Input/TextInput";
import DateInput from "../Input/DateInput";
import PickerInput from "../Input/PickerInput";
import NextButton from "../Button/NextButton";
import Error from "./Error";
import {
  StepOne as Values,
  StepOneErrors as Errors,
} from "../../hooks/useRegisterForm";
import { WIDTH } from "../../constants";

interface PersonalProps {
  handler: {
    values: Values;
    errors: Errors;
    onChange: any;
    onNextStep: () => void;
  };
}

export default function StepOne({
  handler: { values, errors, onChange, onNextStep },
}: PersonalProps) {
  return (
    <View style={styles.form}>
      <TextInput
        accessibilityLabel="Nombre"
        value={values.firstName}
        name="firstName"
        onChange={onChange}
        placeholder="Tu nombre"
        hasError={Boolean(errors.firstName)}
      />
      {errors.firstName && <Error message={errors.firstName} />}
      <TextInput
        accessibilityLabel="Apellido"
        name="lastName"
        value={values.lastName}
        onChange={onChange}
        placeholder="Apellido"
        hasError={Boolean(errors.lastName)}
      />
      {errors.lastName && <Error message={errors.lastName} />}
      <DateInput
        accessibilityLabel="Fecha de nacimiento"
        name="birthday"
        value={values.birthday}
        onChange={onChange}
        hasError={Boolean(errors.birthday)}
      />
      {errors.birthday && <Error message={errors.birthday} />}
      <PickerInput
        accessibilityLabel="Sexo"
        name="gender"
        value={values.gender}
        onChange={onChange}
      >
        <Picker.Item label="Hombre" value="m" />
        <Picker.Item label="Mujer" value="f" />
      </PickerInput>
      {errors.gender && <Error message={errors.gender} />}
      <NextButton onPress={onNextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: WIDTH,
  },
});
