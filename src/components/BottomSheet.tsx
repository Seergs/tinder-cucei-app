import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Modalize } from "react-native-modalize";
import RangeSlider from "react-native-range-slider-expo";
import Toast from "react-native-toast-message";
import {
  MeDocument,
  PeopleDocument,
  useUpdatePreferencesMutation,
} from "../../api";
import useAuth from "../hooks/useAuth";
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
      modalHeight={700}
    >
      {props.children}
    </Modalize>
  );
});

export default BottomSheet;

export const BottomSheetOptions = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState(user.preferences);

  const [updatePreferences, { data, loading }] = useUpdatePreferencesMutation({
    refetchQueries: [
      {
        query: PeopleDocument,
        variables: { limit: 20 },
      },
      {
        query: MeDocument,
      },
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (data?.updatePreferences.__typename === "UpdatePreferencesInputError")
      Toast.show({
        type: "error",
        text1: "Algo salió mal, intenta de nuevo más tarde",
      });
    else if (data?.updatePreferences.__typename === "UpdatePreferencesSuccess")
      Toast.show({
        type: "success",
        text1: "Preferencias actualizadas",
      });
  }, [data]);

  const handlePreferedGenderChange = (newGender: string) =>
    setPreferences({ ...preferences, preferedGender: newGender });

  const handleMinAgeChange = (age: number) => {
    setPreferences({ ...preferences, minAge: age });
  };

  const handleMaxAgeChange = (age: number) => {
    setPreferences({ ...preferences, maxAge: age });
  };

  const handleInterestsChange = (interest: string) => {
    const interests = [...preferences.interests];

    const index = interests.indexOf(interest);
    if (index === -1) {
      interests.push(interest);
    } else {
      interests.splice(index, 1);
    }

    setPreferences({ ...preferences, interests });
  };

  const handleSavePreferences = async () => {
    await updatePreferences({
      variables: {
        preferences: {
          minAge: preferences.minAge,
          maxAge: preferences.maxAge,
          interests: preferences.interests,
          preferedGender: preferences.preferedGender,
        },
      },
    });
  };
  return (
    <View>
      <Text style={[styles.label, { marginTop: 0 }]}>Muéstrame</Text>
      <ButtonGroup
        value={preferences.preferedGender}
        onChange={handlePreferedGenderChange}
      >
        <ButtonGroup.Item name="m">Hombres</ButtonGroup.Item>
        <ButtonGroup.Item name="f">Mujeres</ButtonGroup.Item>
        <ButtonGroup.Item name="b">Ambos</ButtonGroup.Item>
      </ButtonGroup>
      <Text style={styles.label}>Rango de edad a mostrar</Text>
      <RangeSlider
        min={15}
        max={40}
        fromValueOnChange={handleMinAgeChange}
        toValueOnChange={handleMaxAgeChange}
        initialFromValue={preferences.minAge}
        initialToValue={preferences.maxAge}
        styleSize="small"
        fromKnobColor={colors.primaryOrange}
        toKnobColor={colors.primaryOrange}
        inRangeBarColor={colors.textGray}
        valueLabelsBackgroundColor={colors.textDarkGray}
      />
      <Text style={styles.age}>
        {preferences.minAge < 18 ? "🤨" : preferences.maxAge > 30 ? "😏" : null}
      </Text>
      <Text style={styles.label}>Cuáles son tus intereses?</Text>
      <MultiButtonGroup
        values={preferences.interests}
        onChange={handleInterestsChange}
      >
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
        onPress={handleSavePreferences}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
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
