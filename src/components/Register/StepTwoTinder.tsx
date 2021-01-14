import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextInput from "../Input/TextInput";
import ImagePicker from "../ImagePicker";
import NextButton from "../Button/NextButton";
import theme from "../../styles/theme";
import {
  StepTwo as Values,
  StepTwoErrors as Errors,
} from "../../hooks/useRegisterForm";
import Error from "./Error";
import { WIDTH } from "../../constants";
const { colors } = theme;

interface StepTwoProps {
  handler: {
    values: Values;
    errors: Errors;
    onChange: any;
    onChangeSecondaryImages: any;
    onNextStep: () => void;
  };
}

export default function StepTwo({
  handler: { values, errors, onChange, onChangeSecondaryImages, onNextStep },
}: StepTwoProps) {
  return (
    <View style={styles.form}>
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
          value={values.secondaryImagesUrl[0]!}
          onChange={onChangeSecondaryImages}
        />
        <ImagePicker
          position="flex-start"
          index={1}
          name="secondaryImageUrls"
          value={values.secondaryImagesUrl[1]!}
          onChange={onChangeSecondaryImages}
        />
        <ImagePicker
          position="flex-start"
          index={2}
          name="secondaryImageUrls"
          value={values.secondaryImagesUrl[2]!}
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
        hasError={Boolean(errors.description)}
      />
      {errors.description && <Error message={errors.description} />}
      <NextButton onPress={onNextStep} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: WIDTH,
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
    justifyContent: "space-around",
  },
});
