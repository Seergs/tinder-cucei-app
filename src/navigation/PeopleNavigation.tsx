import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import User from "../screens/User";
import People from "../screens/People";

const PeopleNavigator = createStackNavigator();

type PeopleStackNavigatorProps = {
  peopleIndex: number;
  onSwipe: () => void;
};

const PeopleStackNavigator = ({
  peopleIndex,
  onSwipe,
}: PeopleStackNavigatorProps) => {
  return (
    <PeopleNavigator.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide,
      }}
    >
      <PeopleNavigator.Screen name="People">
        {(props) => (
          <People onSwipe={onSwipe} peopleIndex={peopleIndex} {...props} />
        )}
      </PeopleNavigator.Screen>
      <PeopleNavigator.Screen name="User" component={User} />
    </PeopleNavigator.Navigator>
  );
};

export default PeopleStackNavigator;

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
