import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export interface SpringAnimationConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function useSpring(
  value: { to: number },
  config?: SpringAnimationConfig
): Animated.Value {
  const animatedValue = useRef(new Animated.Value(value.to)).current;
  useEffect(() => {
    const animation = Animated.spring(animatedValue, {
      ...config,
      toValue: value.to,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [value.to]);
  return animatedValue;
}
