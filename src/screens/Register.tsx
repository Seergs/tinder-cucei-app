import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Event } from "@react-native-community/datetimepicker";
import theme from "../styles/theme";
import TextInput from "../components/Input/TextInput";
import DateInput from "../components/Input/DateInput";
import DatePicker from "../components/DatePicker";
import PickerInput from "../components/Input/PickerInput";
import NextButton from "../components/Button/NextButton";
import { useForm, Controller } from "react-hook-form";

const { colors } = theme;

export default function Register() {
  const { handleSubmit: onSubmit, control } = useForm();
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  const handleDateChange = (
    _: Event,
    reactHookFormHandler: (...event: any[]) => void,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || new Date();
    setIsDatePickerOpen(Platform.OS === "ios");
    reactHookFormHandler(currentDate);
  };

  const handleSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Crear {"\n"}Cuenta </Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta para empezar a conectar
        </Text>
        <View style={styles.form}>
          <TextInput
            accessibilityLabel="Nombre"
            control={control}
            name="name"
          />
          <TextInput
            accessibilityLabel="Apellido"
            control={control}
            name="lastname"
          />
          <Controller
            name="birthday"
            control={control}
            defaultValue={new Date()}
            render={({ onChange, value }) => (
              <>
                <DatePicker
                  isOpen={isDatePickerOpen}
                  value={value}
                  onDateChange={(e, selectedDate) =>
                    handleDateChange(e, onChange, selectedDate)
                  }
                />
                <DateInput
                  value={value.toDateString()}
                  accessibilityLabel="Fecha de nacimiento"
                  onPress={() => setIsDatePickerOpen(true)}
                />
              </>
            )}
          />
          <PickerInput
            accessibilityLabel="Sexo"
            control={control}
            name="gender"
          >
            <Picker.Item label="Hombre" value="m" />
            <Picker.Item label="Mujer" value="f" />
          </PickerInput>
          <NextButton />
        </View>
        <Button onPress={onSubmit(handleSubmit)} title="Submit">
          Lets go
        </Button>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 20 : 0,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 36,
    color: colors.textBlack,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textGray,
    marginTop: 15,
    fontSize: 16,
  },
  form: {
    marginTop: 20,
  },
});
