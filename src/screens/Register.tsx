import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  TouchableHighlight,
} from "react-native";
import useRegisterForm from "../hooks/useRegisterForm";
import StepOne from "../components/Register/StepOnePersonal";
import NextButton from "../components/Button/NextButton";
import theme from "../styles/theme";

const { colors } = theme;

export default function Register() {
  const {
    stepOneValues,
    step,
    onChangeStepOne,
    onNextStep,
    onPreviousStep,
    stepOneErrors,
  } = useRegisterForm();

  return (
    <View style={styles.page}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para empezar a conectar
        </Text>
        {step > 0 && (
          <TouchableHighlight onPress={onPreviousStep}>
            <Text>Back</Text>
          </TouchableHighlight>
        )}
        {step === 0 && (
          <StepOne
            values={stepOneValues}
            errors={stepOneErrors}
            onChange={onChangeStepOne}
          />
        )}

        <NextButton onPress={onNextStep} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 0,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    color: colors.textBlack,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textGray,
    marginTop: 15,
    fontSize: 16,
  },
});
