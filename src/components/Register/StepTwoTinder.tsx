import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextInput from "../Input/TextInput";
import ImagePicker from "../ImagePicker";
import theme from "../../styles/theme";
const { colors } = theme;

export default function Tinder() {
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Foto principal</Text>
      <ImagePicker position="flex-start" />
      <Text style={styles.label}>Fotos secundarias</Text>
      <View style={styles.secondaryImageContainer}>
        <ImagePicker position="flex-start" />
        <ImagePicker position="flex-start" />
        <ImagePicker position="flex-start" />
      </View>
      <TextInput
        accessibilityLabel="Descripción"
        name="descripction"
        onChange={() => {}}
        value="Hi"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
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
  },
});
