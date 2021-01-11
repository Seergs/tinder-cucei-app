import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TextInput from "../Input/TextInput";
import DateInput from "../Input/DateInput";
import PickerInput from "../Input/PickerInput";
import Error from "./Error";
import {
  StepOne as Values,
  StepOneErrors as Errors,
} from "../../hooks/useRegisterForm";

interface PersonalProps {
  isVisible: boolean;
  animation: Animated.AnimatedInterpolation;
  handler: {
    values: Values;
    errors: Errors;
    onChange: any;
  };
}

export default function StepOne({
  isVisible,
  animation,
  handler: { values, errors, onChange },
}: PersonalProps) {
  if (!isVisible) return null;
  return (
    <Animated.View
      style={[styles.form, { transform: [{ translateX: animation }] }]}
    >
      <TextInput
        accessibilityLabel="Nombre"
        value={values.firstName}
        name="firstName"
        onChange={onChange}
        placeholder="Tu nombre"
      />
      {errors.firstName && <Error message={errors.firstName} />}
      <TextInput
        accessibilityLabel="Apellido"
        name="lastName"
        value={values.lastName}
        onChange={onChange}
        placeholder="Apellido"
      />
      {errors.lastName && <Error message={errors.lastName} />}
      <DateInput
        accessibilityLabel="Fecha de nacimiento"
        name="birthday"
        value={values.birthday}
        onChange={onChange}
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
