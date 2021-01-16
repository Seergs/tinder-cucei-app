import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../styles/theme";
const { colors } = theme;

interface TopbarProps {
  children: React.ReactNode;
  displayStyles: StyleProp<ViewStyle>;
}

export default function Topbar({ children, displayStyles }: TopbarProps) {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.topbar}>
        <LinearGradient
          colors={[colors.primaryOrange, colors.primaryPink]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.linearGradient, displayStyles]}
        >
          {children}
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topbar: {
    height: 90,
  },
  linearGradient: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});
