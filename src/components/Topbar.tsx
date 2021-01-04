import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface TopbarProps {
  children: React.ReactNode;
}

export default function Topbar({ children }: TopbarProps) {
  return (
    <SafeAreaView style={styles.topbar}>
      <LinearGradient
        colors={["#E24386", "#F07E7E"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.linearGradient}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topbar: {
    height: 100,
  },
  linearGradient: {
    flex: 1,
  },
});
