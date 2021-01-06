import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import useForm from "../hooks/useForm";
import StepOne from "../components/Register/StepOnePersonal";
import NextButton from "../components/Button/NextButton";
import theme from "../styles/theme";

const { colors } = theme;

const initialValues = {
  firstName: "",
  lastName: "",
  birthday: new Date(),
  gender: "m",
};

export default function Register() {
  const [step, setStep] = React.useState(2);
  const { values, onChange, onSubmit } = useForm({ initialValues });

  const stepOneValues = {
    firstName: values.firstName,
    lastName: values.lastName,
    birthday: values.birthday,
    gender: values.gender,
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para empezar a conectar
        </Text>
        <TouchableHighlight onPress={() => setStep(step - 1)}>
          <Text>Back</Text>
        </TouchableHighlight>
        {step === 1 && <StepOne values={stepOneValues} onChange={onChange} />}

        <NextButton onPress={handleNextStep} />
        <TouchableHighlight onPress={onSubmit}>
          <Text>Register</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 0,
    paddingLeft: 30,
    paddingRight: 30,
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
