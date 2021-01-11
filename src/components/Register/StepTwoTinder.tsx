import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import TextInput from "../Input/TextInput";
import ImagePicker from "../ImagePicker";
import theme from "../../styles/theme";
import {
  StepTwo as Values,
  StepTwoErrors as Errors,
} from "../../hooks/useRegisterForm";
import Error from "./Error";
const { colors } = theme;

interface StepTwoProps {
  isVisible: boolean;
  animation: Animated.AnimatedInterpolation;
  handler: {
    values: Values;
    errors: Errors;
    onChange: any;
    onChangeSecondaryImages: any;
  };
}

export default function StepTwo({
  isVisible,
  animation,
  handler: { values, errors, onChange, onChangeSecondaryImages },
}: StepTwoProps) {
  if (!isVisible) return null;
  return (
    <Animated.View
      style={[styles.form, { transform: [{ translateX: animation }] }]}
    >
      <Text style={styles.label}>Foto principal</Text>
      <ImagePicker
        position="flex-start"
        name="primaryImageUrl"
        value={values.primaryImageUrl}
        onChange={onChange}
      />
      {errors.primaryImageUrl && <Error message={errors.primaryImageUrl} />}
      <Text style={styles.label}>Fotos secundarias</Text>
      <View style={styles.secondaryImageContainer}>
        <ImagePicker
          position="flex-start"
          index={0}
          name="secondaryImageUrls"
          value={values.secondaryImageUrls[0]!}
          onChange={onChangeSecondaryImages}
        />
        <ImagePicker
          position="flex-start"
          index={1}
          name="secondaryImageUrls"
          value={values.secondaryImageUrls[1]!}
          onChange={onChangeSecondaryImages}
        />
        <ImagePicker
          position="flex-start"
          index={2}
          name="secondaryImageUrls"
          value={values.secondaryImageUrls[2]!}
          onChange={onChangeSecondaryImages}
        />
      </View>
      <TextInput
        accessibilityLabel="Descripción"
        name="description"
        type="textarea"
        onChange={onChange}
        value={values.description}
        placeholder="Di algo sobre ti, esto lo verán los demás..."
      />
      {errors.description && <Error message={errors.description} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.textDarkGray,
  },
  secondaryImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
