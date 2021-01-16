import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Welcome from "./screens/Welcome";
import People from "./screens/People";
import useAuth from "./hooks/useAuth";

const Stack = createStackNavigator();

export default function App() {
  //const { isAuthenticated } = useAuth();

  //return isAuthenticated ? <AuthApp /> : <UnauthApp />;
  return <AuthApp />;
}

const AuthApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="People" component={People} />
      </Stack.Navigator>
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
