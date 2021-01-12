import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Topbar from "../components/Topbar";
import useRegisterForm from "../hooks/useRegisterForm";
import StepOne from "../components/Register/StepOnePersonal";
import StepTwo from "../components/Register/StepTwoTinder";
import StepThree from "../components/Register/StepThreeCucei";
import theme from "../styles/theme";
import { WIDTH } from "../constants";
import { FlatList } from "react-native-gesture-handler";

const { colors } = theme;

const steps = [0, 1, 2];

export default function Register() {
  const ref = React.useRef<any>();
  const {
    step,
    stepOneHandler,
    stepTwoHandler,
    stepThreeHandler,
    onPreviousStep,
  } = useRegisterForm();

  React.useEffect(() => {
    ref.current.scrollToOffset({
      offset: step * WIDTH,
      animated: true,
    });
  }, [step]);

  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Registro</Text>
      </Topbar>
      <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
      <Text style={styles.subtitle}>
        Crea tu cuenta para empezar a conectar
      </Text>
      {step > 0 && (
        <Animated.View>
          <TouchableOpacity
            accessibilityHint="go to previous step"
            onPress={() => {
              onPreviousStep();
            }}
            style={styles.backButton}
            activeOpacity={0.3}
          >
            <AntDesign name="arrowleft" size={20} />
          </TouchableOpacity>
        </Animated.View>
      )}

      <FlatList
        ref={ref}
        data={steps}
        keyExtractor={(item) => item.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        renderItem={({ index }) => (
          <ScrollView keyboardShouldPersistTaps="handled">
            {index === 0 && <StepOne handler={stepOneHandler} />}
            {index === 1 && <StepTwo handler={stepTwoHandler} />}
            {index === 2 && <StepThree handler={stepThreeHandler} />}
          </ScrollView>
        )}
      />
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
});
