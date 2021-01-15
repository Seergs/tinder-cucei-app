import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRegistry } from "react-native";
import Toast from "react-native-toast-message";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import Welcome from "./src/screens/Welcome";
import AppProviders from "./src/components/Providers";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AppProviders>
  );
}

AppRegistry.registerComponent("MyApp", () => App);
