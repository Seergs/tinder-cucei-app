import React from "react";
import { StyleSheet, View } from "react-native";
import { WIDTH } from "../../constants";
import PickerInput from "../Input/PickerInput";
import NextButton from "../Button/NextButton";
import Error from "./Error";
import {
  StepThree as Values,
  StepThreeErrors as Errors,
} from "../../hooks/useRegisterForm";
import { Picker } from "@react-native-picker/picker";
import TextInput from "../Input/TextInput";

interface CuceiProps {
  handler: {
    values: Values;
    errors: Errors;
    onChange: any;
    onNextStep: () => void;
  };
}
export default function StepThree({
  handler: { values, errors, onChange, onNextStep },
}: CuceiProps) {
  return (
    <View style={styles.form}>
      <PickerInput
        accessibilityLabel="Carrera"
        name="career"
        value={values.career}
        onChange={onChange}
      >
        <Picker.Item label="Ingeniería en computación" value="INCO" />
        <Picker.Item label="Ingeniería en informática" value="INNI" />
      </PickerInput>
      {errors.career && <Error message={errors.career} />}
      <TextInput
        accessibilityLabel="Código de estudiante de UDG"
        hasError={Boolean(errors.studentCode)}
        name="studentCode"
        onChange={onChange}
        value={values.studentCode}
        keyboardType="numeric"
        placeholder="Tu código de estudiante"
      />
      {errors.studentCode && <Error message={errors.studentCode} />}
      <TextInput
        accessibilityLabel="NIP"
        hasError={Boolean(errors.studentNip)}
        name="studentNip"
        onChange={onChange}
        value={values.studentNip}
        placeholder="Tu contraseña secreta"
        secureTextEntry
      />
      {errors.studentNip && <Error message={errors.studentNip} />}
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
