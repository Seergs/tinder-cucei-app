import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  ButtonGroupContext,
  ButtonGroupMultiContext,
  IButtonGroupContext,
  IButtonGroupMultiContext,
} from "../../context/ButtonGroupContext";
import theme from "../../styles/theme";
const { colors } = theme;

export type ButtonGroupItemProps = {
  name: string;
  children: string;
};

export const ButtonGroupItem = ({ name, children }: ButtonGroupItemProps) => {
  const { selectedButton, setSelectedButton } = useContext<IButtonGroupContext>(
    ButtonGroupContext
  );

  const isActive = selectedButton === name;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setSelectedButton(name)}
      style={[
        {
          backgroundColor: isActive ? colors.primaryOrange : "transparent",
        },
        buttonStyles.button,
      ]}
    >
      <Text
        style={{
          color: isActive ? "white" : colors.textDarkGray,
          fontWeight: "bold",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    borderColor: colors.primaryOrange,
    borderWidth: 1,
    width: "30%",
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export const ButtonGroupMultiItem = ({
  name,
  children,
}: ButtonGroupItemProps) => {
  const { values, onAddItem } = useContext<IButtonGroupMultiContext>(
    ButtonGroupMultiContext
  );

  const isActive = values.includes(name);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onAddItem(name)}
      style={[
        {
          backgroundColor: isActive ? colors.primaryOrange : "transparent",
        },
        buttonStyles.button,
      ]}
    >
      <Text
        style={{
          color: isActive ? "white" : colors.textDarkGray,
          fontWeight: "bold",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
