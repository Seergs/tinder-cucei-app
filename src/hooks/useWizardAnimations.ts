import { useRef } from "react";
import { Animated } from "react-native";
import { WIDTH } from "../constants";

export default function useWizardAnimations(steps: number) {
  const animation = useRef(new Animated.Value(0)).current;

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(WIDTH * steps)],
  });

  const fade = animation.interpolate({
    inputRange: [0, 1 / steps],
    outputRange: [0, 1],
  });

  const startAnimation = (progress: number) => {
    Animated.spring(animation, {
      toValue: progress,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  return { animation, translateX, fade, startAnimation };
}
