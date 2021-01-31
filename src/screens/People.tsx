import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Topbar from "../components/Topbar";
import SwipeButton from "../components/Button/SwipeButton";
import Swiper from "../components/Swiper";
import theme from "../styles/theme";
const { colors } = theme;

type PeopleProps = {
  peopleIndex: number;
  onSwipe: () => void;
};

const People = React.memo(({ peopleIndex, onSwipe }: PeopleProps) => {
  const swiperRef = useRef<DeckSwiper<any>>(null);

  return (
    <View style={styles.page}>
      <SwipeButton
        type="like"
        onPress={() => swiperRef.current?.swipeRight()}
      />
      <SwipeButton
        type="dislike"
        onPress={() => {
          swiperRef.current?.swipeLeft();
        }}
      />
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Personas</Text>
      </Topbar>
      <Swiper onSwipe={onSwipe} peopleIndex={peopleIndex} ref={swiperRef} />
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
