import React from "react";
import { ScrollView, Text, StyleSheet, View, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Topbar from "../components/Topbar";
import useRegisterForm from "../hooks/useRegisterForm";
import StepOne from "../components/Register/StepOnePersonal";
import StepTwo from "../components/Register/StepTwoTinder";
import NextButton from "../components/Button/NextButton";
import theme from "../styles/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const { colors } = theme;

export default function Register() {
  const scrollViewRef = React.useRef<any>();
  const {
    step,
    stepOneHandler,
    stepTwoHandler,
    onNextStep,
    onPreviousStep,
  } = useRegisterForm();

  const animation = React.useRef(new Animated.Value(0)).current;

  const slideInAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const slideOutAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -500],
  });

  const fade = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Registro</Text>
      </Topbar>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para empezar a conectar
        </Text>
        {step > 0 && (
          <Animated.View style={{ opacity: fade }}>
            <TouchableOpacity
              accessibilityHint="go to previous step"
              onPress={() => {
                onPreviousStep();
                scrollViewRef.current.scrollTo({
                  x: 0,
                  y: 0,
                  animated: true,
                });
                Animated.spring(animation, {
                  toValue: 0,
                  useNativeDriver: true,
                  bounciness: 0,
                }).start();
              }}
              style={styles.backButton}
              activeOpacity={0.3}
            >
              <AntDesign name="arrowleft" size={20} />
            </TouchableOpacity>
          </Animated.View>
        )}
        <StepOne
          animation={slideOutAnimation}
          handler={stepOneHandler}
          isVisible={step === 0}
        />
        <StepTwo
          animation={slideInAnimation}
          handler={stepTwoHandler}
          isVisible={step === 1}
        />

        <NextButton
          onPress={() => {
            onNextStep();
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            Animated.spring(animation, {
              toValue: 1,
              useNativeDriver: true,
              bounciness: 0,
            }).start();
          }}
        />
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
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    color: colors.textBlack,
    fontWeight: "700",
    paddingHorizontal: 20,
  },
  subtitle: {
    color: colors.textGray,
    marginTop: 15,
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
    marginTop: 10,
    justifyContent: "center",
    marginLeft: 20,
  },
});
