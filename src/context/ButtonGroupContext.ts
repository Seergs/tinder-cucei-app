import { createContext } from "react";
export type IButtonGroupContext = {
  selectedButton: string;
  setSelectedButton: (newButton: string) => void;
};

export type IButtonGroupMultiContext = {
  values: string[];
  onAddItem: (item: string) => void;
};

export const ButtonGroupContext = createContext<IButtonGroupContext>({
  selectedButton: "",
  setSelectedButton: () => {},
});
export const ButtonGroupMultiContext = createContext<IButtonGroupMultiContext>({
  values: [],
  onAddItem: () => {},
});
