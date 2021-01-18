import React from "react";
import { View } from "react-native";
import { ButtonGroupMultiItem } from "./ButtonGroupItem";
import { ButtonGroupMultiContext } from "../../context/ButtonGroupContext";

export type MultiButtonGroupProps = {
  values: string[];
  children: React.ReactNode;
  onChange: (item: string) => void;
};

export const MultiButtonGroup = ({
  values,
  children,
  onChange,
}: MultiButtonGroupProps) => {
  return (
    <ButtonGroupMultiContext.Provider value={{ values, onAddItem: onChange }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {children}
      </View>
    </ButtonGroupMultiContext.Provider>
  );
};

MultiButtonGroup.Item = ButtonGroupMultiItem;
