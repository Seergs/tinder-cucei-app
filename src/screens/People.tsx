import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import SwipeButton from "../components/Button/SwipeButton";
import Swiper from "../components/Swiper";
import theme from "../styles/theme";
const { colors } = theme;

export default function People() {
  return (
    <View style={styles.page}>
      <SwipeButton type="like" />
      <SwipeButton type="dislike" />
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Personas</Text>
        <Ionicons
          name="menu"
          color="white"
          size={26}
          style={styles.topbarIcon}
        />
      </Topbar>
      <Swiper />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    flex: 1,
    justifyContent: "space-between",
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
  },
  topbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  topbarIcon: {
    position: "absolute",
    right: 20,
    top: 46,
  },
});
