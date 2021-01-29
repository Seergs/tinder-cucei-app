import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import Toast from "react-native-toast-message";
import { useUpdatePreferencesMutation } from "../api";
import BottomSheet, { BottomSheetOptions } from "./components/BottomSheet";
import FullpageSpinner from "./components/FullpageSpinner";
import useAuth from "./hooks/useAuth";
import Login from "./screens/Login";
import People from "./screens/People";
import Register from "./screens/Register";
import Welcome from "./screens/Welcome";

const Stack = createStackNavigator();

export default function App() {
  const { isAuthenticated, isPending } = useAuth();
  console.log({ isPending });

  if (isPending) return <FullpageSpinner />;

  return isAuthenticated ? <AuthApp /> : <UnauthApp />;
}

const AuthApp = () => {
  const { user } = useAuth();
  const modalizeRef = useRef<Modalize>(null);

  const [config, setConfig] = useState(user.preferences);

  const [updatePreferences, { data, loading }] = useUpdatePreferencesMutation({
    refetchQueries: ["people"],
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
    setConfig({ ...config, preferedGender: newGender });

  const handleMinAgeChange = (age: number) => {
    setConfig({ ...config, minAge: age });
  };

  const handleMaxAgeChange = (age: number) => {
    setConfig({ ...config, maxAge: age });
  };

  const handleInterestsChange = (interest: string) => {
    const interests = [...config.interests];

    const index = interests.indexOf(interest);
    if (index === -1) {
      interests.push(interest);
    } else {
      interests.splice(index, 1);
    }

    setConfig({ ...config, interests });
  };

  const handleSaveConfig = async () => {
    await updatePreferences({
      variables: {
        preferences: {
          minAge: config.minAge,
          maxAge: config.maxAge,
          interests: config.interests,
          preferedGender: config.preferedGender,
        },
      },
    });
  };

  const handleOpenBottomSheet = () => {
    modalizeRef.current?.open();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="People">
          {(props) => (
            <People onOpenBottomSheet={handleOpenBottomSheet} {...props} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <BottomSheet ref={modalizeRef}>
        <BottomSheetOptions
          config={config}
          isLoading={loading}
          onMinAgeChange={handleMinAgeChange}
          onMaxAgeChange={handleMaxAgeChange}
          onInterestsChange={handleInterestsChange}
          onPreferedGenderChange={handlePreferedGenderChange}
          onSave={handleSaveConfig}
        />
      </BottomSheet>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

const UnauthApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};
