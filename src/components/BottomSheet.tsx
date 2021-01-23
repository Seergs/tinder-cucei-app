import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Slider from "@react-native-community/slider";
import theme from "../styles/theme";
import { ButtonGroup, MultiButtonGroup } from "./ButtonGroup";
const { colors } = theme;

type BottomSheetProps = {
  children: React.ReactNode;
};

const BottomSheet = React.forwardRef((props: BottomSheetProps, ref) => {
  return (
    <Modalize
      modalStyle={{ padding: 30 }}
      ref={ref as any}
      snapPoint={300}
      modalHeight={600}
    >
      {props.children}
    </Modalize>
  );
});

export default BottomSheet;

type BottomSheetOptionsProps = {
  config: {
    preferedGender: string;
    ageRange: number;
    interests: string[];
  };
  isLoading: boolean;
  onPreferedGenderChange: (newGender: string) => void;
  onAgeRangeChange: (newAge: number) => void;
  onInterestsChange: (interest: string) => void;
  onSave: () => void;
};

export const BottomSheetOptions = ({
  config,
  isLoading,
  onPreferedGenderChange,
  onAgeRangeChange,
  onInterestsChange,
  onSave,
}: BottomSheetOptionsProps) => {
  return (
    <View>
      <Text style={[styles.label, { marginTop: 0 }]}>Muéstrame</Text>
      <ButtonGroup
        value={config.preferedGender}
        onChange={onPreferedGenderChange}
      >
        <ButtonGroup.Item name="m">Hombres</ButtonGroup.Item>
        <ButtonGroup.Item name="f">Mujeres</ButtonGroup.Item>
        <ButtonGroup.Item name="b">Ambos</ButtonGroup.Item>
      </ButtonGroup>
      <Text style={styles.label}>Rango de edad a mostrar</Text>
      <Slider
        minimumValue={15}
        maximumValue={50}
        step={1}
        value={config.ageRange}
        onValueChange={onAgeRangeChange}
        thumbTintColor={colors.primaryPink}
        minimumTrackTintColor={colors.primaryOrange}
      />
      <Text style={styles.age}>
        {config.ageRange} años{" "}
        {config.ageRange < 18 ? "🤨" : config.ageRange > 30 ? "😏" : null}
      </Text>
      <Text style={styles.label}>Cuáles son tus intereses?</Text>
      <MultiButtonGroup values={config.interests} onChange={onInterestsChange}>
        <MultiButtonGroup.Item name="Caminar">Caminar</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Cantar">Cantar</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Hacer amigos">
          Hacer amigos
        </MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Viajar">Viajar</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Leer">Leer</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Bailar">Bailar</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Deportes">Deportes</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Series">Series</MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Películas">
          Películas
        </MultiButtonGroup.Item>
        <MultiButtonGroup.Item name="Tecnología">
          Tecnología
        </MultiButtonGroup.Item>
      </MultiButtonGroup>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={onSave}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>GUARDAR</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.textBlack,
    marginTop: 30,
    marginBottom: 5,
  },
  tag: {
    width: 80,
    height: 35,
    backgroundColor: "white",
    borderColor: colors.primaryOrange,
    borderWidth: 1,
    borderRadius: 5,
  },
  age: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.textDarkGray,
  },
  saveButton: {
    marginVertical: 20,
    backgroundColor: colors.textBlack,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
