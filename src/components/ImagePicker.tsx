import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../styles/theme";
const { colors } = theme;

interface ImagePickerProps {
  position: "center" | "flex-end" | "flex-start";
}

export default function ImagePicker({ position }: ImagePickerProps) {
  return (
    <View style={[styles.container, { alignSelf: position }]}>
      <TouchableOpacity style={styles.selectButton}>
        <AntDesign name="camera" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textLightGray,
    flex: 1,
    height: 100,
    width: 100,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  selectButton: {
    position: "absolute",
    right: -5,
    bottom: -5,
    backgroundColor: colors.textDarkGray,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
