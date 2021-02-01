import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import User from "../screens/User";
import Matches from "../screens/Matches";

const MatchesStack = createStackNavigator();

const MatchesStackNavigator = () => {
  return (
    <MatchesStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide,
      }}
    >
      <MatchesStack.Screen name="Matches" component={Matches} />
      <MatchesStack.Screen name="User" component={User} />
    </MatchesStack.Navigator>
  );
};

export default MatchesStackNavigator;

const forSlide = ({ current, next, inverted, layouts: { screen } }: any) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
    },
  };
};
