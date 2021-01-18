import React from "react";
import { View } from "react-native";
import { ButtonGroupItem } from "./ButtonGroupItem";
import { ButtonGroupContext } from "../../context/ButtonGroupContext";

export type ButtonGroupProps = {
  value: string;
  children: React.ReactNode;
  onChange: (newButton: string) => void;
};

export const ButtonGroup = ({
  value,
  onChange,
  children,
}: ButtonGroupProps) => {
  return (
    <ButtonGroupContext.Provider
      value={{ selectedButton: value, setSelectedButton: onChange }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {children}
      </View>
    </ButtonGroupContext.Provider>
  );
};

ButtonGroup.Item = ButtonGroupItem;
