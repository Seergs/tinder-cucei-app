import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import WelcomeImage from "../svg/WelcomeImage";
import { WIDTH } from "../constants";
import theme from "../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const { colors } = theme;

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <WelcomeImage width={WIDTH} height={400} />
      <Text style={styles.headline}>
        Encuentra amigos y conecta con personas{" "}
        <Text style={styles.headlineBold}>rápido</Text> y{" "}
        <Text style={styles.headlineBold}>seguro</Text>
      </Text>
      <Text style={styles.subtitle}>Regristrarse no toma más de 2 minutos</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Registro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            colors={[colors.primaryOrange, colors.primaryPink]}
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.bg,
  },
  headline: {
    maxWidth: 350,
    alignSelf: "center",
    fontSize: 28,
    textAlign: "center",
  },
  headlineBold: {
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 20,
    color: colors.textGray,
    textAlign: "center",
    fontSize: 18,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
});
