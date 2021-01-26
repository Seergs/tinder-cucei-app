import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import FullpageSpinner from "./FullpageSpinner";
import theme from "../styles/theme";
import { usePeopleQuery } from "../../api";
const { colors } = theme;

export default function Swiper() {
  const { data, error, loading } = usePeopleQuery({
    variables: { limit: 20 },
  });

  if (loading) return <FullpageSpinner />;
  if (error || data!.people.__typename === "MeResultError")
    return <Text>Ups</Text>;
  return (
    <View style={styles.container}>
      <DeckSwiper
        cards={data!.people.people}
        cardIndex={0}
        backgroundColor="transparent"
        stackSize={3}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: card.primaryImageUrl }}
                style={styles.image}
              />
              <Text style={styles.personName}>
                {card.firstName} {card.lastName}, {card.age}
              </Text>
              <Text style={styles.career}>{card.career}</Text>
              <View style={styles.separator} />
            </View>
          );
        }}
        onSwipedAll={() =>
          Toast.show({
            type: "info",
            text1: "¡Wow! Parece que has deslizado demasiado",
            text2: "Vuelve más tarde para encontrar más gente",
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 400,
    alignSelf: "center",
  },
  personName: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.textBlack,
  },
  career: {
    color: colors.textGray,
    marginBottom: 20,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.textLightGray,
  },
  interests: {
    color: colors.textGray,
    marginTop: 20,
  },
});
