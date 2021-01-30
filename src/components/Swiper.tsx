import React, { forwardRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import FullpageSpinner from "./FullpageSpinner";
import { usePeopleQuery, useLikeMutation, useDislikeMutation } from "../../api";
import useAuth from "../hooks/useAuth";
import Card from "./Card";

const Swiper = forwardRef<DeckSwiper<any>>((_, ref) => {
  const { user } = useAuth();
  const {
    data: peopleData,
    error: peopleError,
    loading: isPeopleLoading,
  } = usePeopleQuery({
    variables: { limit: 20 },
    onError: () =>
      Toast.show({
        type: "error",
        text1: "Algo salió mal, intenta de nuevo más tarde",
      }),
  });

  const [like] = useLikeMutation();
  const [dislike] = useDislikeMutation();

  if (isPeopleLoading) return <FullpageSpinner />;
  if (peopleError || peopleData!.people.__typename === "MeResultError")
    return <Text>Ups</Text>;

  if (peopleData!.people.people.length) {
    return (
      <View style={styles.container}>
        <DeckSwiper
          ref={ref}
          cards={peopleData!.people.people}
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
          onSwipedRight={(i) => {
            let targetUserId = "";
            if (peopleData?.people.__typename === "PeopleSuccess") {
              targetUserId = peopleData.people.people[i].id;
            }
            like({
              variables: {
                targetUserId,
              },
            });
          }}
          onSwipedLeft={(i) => {
            let targetUserId = "";
            if (peopleData?.people.__typename === "PeopleSuccess") {
              targetUserId = peopleData.people.people[i].id;
            }
            dislike({
              variables: {
                targetUserId,
              },
            });
          }}
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
