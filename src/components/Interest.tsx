import React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from "../styles/theme";
const { colors } = theme;

type InterestProps = {
  isTinted?: boolean;
  children: React.ReactNode;
};

const Interest = ({ children, isTinted = false }: InterestProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: isTinted ? colors.primaryOrange : "transparent",
        },
        styles.button,
      ]}
    >
      <Text
        style={{
          color: isTinted ? "white" : colors.textDarkGray,
          fontWeight: "bold",
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Interest;

const styles = StyleSheet.create({
  button: {
    borderColor: colors.primaryOrange,
    borderWidth: 1,
    width: 100,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
