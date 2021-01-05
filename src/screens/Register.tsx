import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useForm } from "react-hook-form";
import PersonalRegisterForm from "../components/Register/Personal";
import NextButton from "../components/Button/NextButton";
import theme from "../styles/theme";

const { colors } = theme;

export default function Register() {
  const { handleSubmit: onSubmit, control } = useForm();

  const handleSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para empezar a conectar
        </Text>
        <PersonalRegisterForm control={control} />
        <NextButton />
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
