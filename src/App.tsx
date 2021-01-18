import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Welcome from "./screens/Welcome";
import People from "./screens/People";
import BottomSheet, { BottomSheetOptions } from "./components/BottomSheet";
import { Modalize } from "react-native-modalize";

const Stack = createStackNavigator();

export default function App() {
  //const { isAuthenticated } = useAuth();

  //return isAuthenticated ? <AuthApp /> : <UnauthApp />;
  return <AuthApp />;
}

const AuthApp = () => {
  const modalizeRef = useRef<Modalize>(null);

  function handleCloseBottomSheet() {}

  function handleOpenBottomSheet() {
    modalizeRef.current?.open();
  }
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
        <BottomSheetOptions />
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
