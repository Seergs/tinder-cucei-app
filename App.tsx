import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./src/screens/Register";
import AppProviders from "./src/components/Providers";
import { AppRegistry } from "react-native";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AppProviders>
  );
}

AppRegistry.registerComponent("MyApp", () => App);
