import React, { forwardRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import FullpageSpinner from "./FullpageSpinner";
import { usePeopleQuery } from "../../api";
import useAuth from "../hooks/useAuth";
import Card from "./Card";

const Swiper = forwardRef<DeckSwiper<any>>((_, ref) => {
  const { data, error, loading } = usePeopleQuery({
    variables: { limit: 20 },
  });
  const { user } = useAuth();

  if (loading) return <FullpageSpinner />;
  if (error || data!.people.__typename === "MeResultError")
    return <Text>Ups</Text>;

  if (data?.people.people.length) {
    return (
      <View style={styles.container}>
        <DeckSwiper
          ref={ref}
          cards={data!.people.people}
          backgroundColor="transparent"
          stackSize={3}
          verticalSwipe={false}
          renderCard={(card) => (
            <Card card={card} userInterests={user.preferences.interests} />
          )}
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
  return (
    <Text>
      No hay personas para mostrar, modifica el filtro o vuelve más tarde
    </Text>
  );
});

export default Swiper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
