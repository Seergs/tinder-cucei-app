import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useLoginMutation } from "../../api";
import NextButton from "../components/Button/NextButton";
import Error from "../components/Error";
import TextInput from "../components/Input/TextInput";
import Topbar from "../components/Topbar";
import useAsyncStorage from "../hooks/useAsyncStorage";
import theme from "../styles/theme";
import { AuthDispatchContext } from "../context/AuthContext";

const { colors } = theme;

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useContext(AuthDispatchContext);

  const { setValue: setJwt } = useAsyncStorage("jwt", null);

  const [studentCode, setStudentCode] = useState<{
    value: string;
    error: string | null | undefined;
  }>({ value: "", error: null });
  const [studentNip, setStudentNip] = useState<{
    value: string;
    error: string | null | undefined;
  }>({ value: "", error: null });

  const [login, { data, error, loading }] = useLoginMutation();

  React.useEffect(() => {
    if (error)
      Toast.show({
        type: "error",
        text1: "Ups",
        text2: "Algo salió mal, intenta de nuevo más tarde",
      });
  }, [error]);

  React.useEffect(() => {
    if (data?.login.__typename === "UserLoginInvalidInputError") {
      setStudentCode({ ...studentCode, error: data.login.studentCode });
      setStudentNip({ ...studentNip, error: data.login.studentNip });
      if (data.login.credentials) {
        setStudentNip({ ...studentNip, error: data.login.credentials });
      }
    } else if (data?.login.__typename === "UserLoginResultSuccess") {
      setJwt(data.login.jwt);
      dispatch!({ type: "success", payload: data.login });
    }
  }, [data]);

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
          onChange={(_, newValue) =>
            setStudentCode({ ...studentCode, value: newValue })
          }
          value={studentCode.value}
          placeholder="Tu código"
          keyboardType="numeric"
        />
        {studentCode.error && <Error message={studentCode.error} />}
        <TextInput
          accessibilityLabel="Nip"
          hasError={Boolean(studentNip.error)}
          name="studentNip"
          onChange={(_, newValue) =>
            setStudentNip({ ...studentNip, value: newValue })
          }
          value={studentNip.value}
          secureTextEntry
          placeholder="Tú contraseña secreta"
        />
        {studentNip.error && <Error message={studentNip.error} />}
      </View>
      <NextButton
        isLoading={loading}
        onPress={() => {
          setStudentCode({ ...studentCode, error: null });
          setStudentNip({ ...studentNip, error: null });
          const loginInputData = {
            studentCode: studentCode.value,
            studentNip: studentNip.value,
          };
          login({
            variables: {
              loginInputData,
            },
          });
        }}
      />

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
