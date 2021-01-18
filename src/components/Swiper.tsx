import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import theme from "../styles/theme";
const { colors } = theme;

const fakeData = [
  {
    id: "1",
    firstName: "Jane",
    lastName: "Doe",
    age: 22,
    profilePicture:
      "https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    career: "Ingeniería Química",
    interest: ["Fitness", "Viajar", "Conocer personas", "Leer"],
  },
  {
    id: "2",
    firstName: "Julia",
    lastName: "Doe",
    age: 21,
    profilePicture:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    career: "Ingeniería en alimentos",
    interest: ["Bailar", "Viajar"],
  },
  {
    id: "3",
    firstName: "Martha",
    lastName: "Doe",
    age: 24,
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    career: "Licenciatura en química",
    interest: ["Canter", "Leer", "Deportes"],
  },
];

export default function Swiper() {
  return (
    <View style={styles.container}>
      <DeckSwiper
        cards={fakeData}
        cardIndex={0}
        backgroundColor="transparent"
        stackSize={3}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: card.profilePicture }}
                style={styles.image}
              />
              <Text style={styles.personName}>
                {card.firstName} {card.lastName}, {card.age}
              </Text>
              <Text style={styles.career}>{card.career}</Text>
              <View style={styles.separator} />
              <Text style={styles.interests}>
                {card.interest.map((interest) => `${interest} `)}
              </Text>
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
