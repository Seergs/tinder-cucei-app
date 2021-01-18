import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import SwipeButton from "../components/Button/SwipeButton";
import Swiper from "../components/Swiper";
import theme from "../styles/theme";
const { colors } = theme;

type PeopleProps = {
  onOpenBottomSheet: () => void;
};

const People = React.memo(({ onOpenBottomSheet }: PeopleProps) => {
  return (
    <View style={styles.page}>
      <SwipeButton type="like" />
      <SwipeButton type="dislike" />
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Personas</Text>
      </Topbar>
      <Swiper />
      <Footer onOpenBottomSheet={onOpenBottomSheet} />
    </View>
  );
});
export default People;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    flex: 1,
    justifyContent: "space-between",
  },
  topbar: {
    alignItems: "center",
    justifyContent: "center",
  },
  topbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
