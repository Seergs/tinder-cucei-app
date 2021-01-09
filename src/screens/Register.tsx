import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Topbar from "../components/Topbar";
import useRegisterForm from "../hooks/useRegisterForm";
import StepOne from "../components/Register/StepOnePersonal";
import StepTwo from "../components/Register/StepTwoTinder";
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
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Registro</Text>
      </Topbar>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para empezar a conectar
        </Text>
        {step > 0 && (
          <TouchableHighlight
            onPress={onPreviousStep}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={20} />
          </TouchableHighlight>
        )}
        {step === 0 && (
          <StepOne
            values={stepOneValues}
            errors={stepOneErrors}
            onChange={onChangeStepOne}
          />
        )}

        {step === 1 && <StepTwo />}

        <NextButton onPress={onNextStep} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  topbar: {
    alignItems: "center",
    justifyContent: "center",
  },
  topbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    width: 30,
    height: 30,
    marginTop: 10,
    justifyContent: "center",
  },
});
