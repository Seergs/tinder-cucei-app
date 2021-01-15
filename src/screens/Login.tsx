import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Topbar from "../components/Topbar";
import theme from "../styles/theme";
import TextInput from "../components/Input/TextInput";

const { colors } = theme;

export default function Register() {
  const navigation = useNavigation();
  const [studentCode, setStudentCode] = useState<{
    value: string;
    error: string | null;
  }>({ value: "", error: null });
  const [studentNip, setStudentNip] = useState<{
    value: string;
    error: string | null;
  }>({ value: "", error: null });

  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Iniciar sesión</Text>
      </Topbar>
      <Text style={styles.title}>Bienvenido {"\n"}de vuelta </Text>
      <Text style={styles.subtitle}>
        Inicia sesión para comenzar a conectar
      </Text>

      <View style={styles.container}>
        <TextInput
          accessibilityLabel="Código de estudiante de UDG"
          hasError={Boolean(studentCode.error)}
          name="studentCode"
          onChange={(_, newValue) => setStudentCode(newValue)}
          value={studentCode.value}
          placeholder="Tu código"
        />
        <TextInput
          accessibilityLabel="Nip"
          hasError={Boolean(studentNip.error)}
          name="studentNip"
          onChange={(_, newValue) => setStudentNip(newValue)}
          value={studentNip.value}
          secureTextEntry
          placeholder="Tú contraseña secreta"
        />
      </View>

      <Text style={styles.linkText}>
        No tienes una cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Regístrate
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    color: colors.textBlack,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    color: colors.textGray,
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 20,
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
    marginBottom: 10,
    justifyContent: "center",
    marginLeft: 20,
  },
  linkText: {
    color: colors.textGray,
    fontSize: 16,
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  link: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primaryOrange,
    alignItems: "center",
  },
});
