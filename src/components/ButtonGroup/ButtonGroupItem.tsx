import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import {
  ButtonGroupContext,
  ButtonGroupMultiContext,
  IButtonGroupContext,
  IButtonGroupMultiContext,
} from "../../context/ButtonGroupContext";
import Interest from "../Interest";

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
    >
      <Interest isTinted={isActive}>{children}</Interest>
    </TouchableOpacity>
  );
};

export const ButtonGroupMultiItem = ({
  name,
  children,
}: ButtonGroupItemProps) => {
  const { values, onAddItem } = useContext<IButtonGroupMultiContext>(
    ButtonGroupMultiContext
  );

  const isActive = values.includes(name);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onAddItem(name)}>
      <Interest isTinted={isActive}>{children}</Interest>
    </TouchableOpacity>
  );
};
