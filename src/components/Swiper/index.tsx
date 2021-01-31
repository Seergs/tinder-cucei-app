import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import {
  MatchesDocument,
  MatchesQuery,
  useDislikeMutation,
  useLikeMutation,
  usePeopleQuery,
} from "../../../api";
import theme from "../../styles/theme";
import FullpageSpinner from "../FullpageSpinner";
import Swiper from "./Swiper";
const { colors } = theme;

const SwiperContainer = React.forwardRef<DeckSwiper<any>>((_, ref) => {
  const [isDeckFinished, setIsDeckFinished] = React.useState(false);
  const [like] = useLikeMutation({
    update: (cache, { data }) => {
      if (!data || data.likePerson.__typename !== "LikeSuccess") return;

      const {
        likePerson: { match },
      } = data;
      if (match) {
        const existingMatches = cache.readQuery<MatchesQuery>({
          query: MatchesDocument,
        });

        if (existingMatches?.matches) {
          cache.writeQuery({
            query: MatchesDocument,
            data: {
              matches: [match, ...existingMatches.matches],
            },
          });
        }
      }
    },
  });
  const [dislike] = useDislikeMutation();

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

  const handleLike = async (index: number) => {
    if (
      typeof peopleData !== "undefined" &&
      peopleData.people.__typename === "PeopleSuccess"
    ) {
      const targetUser = peopleData.people.people[index];

      const { data } = await like({
        variables: {
          targetUserId: targetUser.id,
        },
      });

      if (!data || data.likePerson.__typename !== "LikeSuccess") return;

      const { likePerson } = data;

      if (likePerson.match) {
        Toast.show({
          type: "success",
          text1: `♥ Hiciste match con ${targetUser.firstName}`,
          text2: "Ve a la pestaña Matches para ver",
        });
      }
    }
  };

  const handleDislike = (index: number) => {
    if (
      typeof peopleData !== "undefined" &&
      peopleData.people.__typename === "PeopleSuccess"
    ) {
      const targetUserId = peopleData.people.people[index].id;

      dislike({
        variables: {
          targetUserId,
        },
      });
    }
  };

  const handleFinish = () => {
    setIsDeckFinished(true);
    Toast.show({
      type: "info",
      text1: "¡Wow! Parece que has deslizado demasiado",
      text2: "Vuelve más tarde para encontrar más gente",
    });
  };

  if (isPeopleLoading) return <FullpageSpinner />;
  if (peopleError || peopleData?.people.__typename === "MeResultError")
    return <Text>Ups</Text>;

  if (
    typeof peopleData === "undefined" ||
    !peopleData.people.people.length ||
    isDeckFinished
  ) {
    return (
      <Text style={styles.emptyText}>
        No se encontraron personas, cambia el filtro o vuelve más tarde
      </Text>
    );
  }

  if (peopleData && peopleData.people.__typename === "PeopleSuccess")
    return (
      <View style={styles.root}>
        <Swiper
          ref={ref}
          people={peopleData.people.people}
          onLike={handleLike}
          onDislike={handleDislike}
          onFinish={handleFinish}
        />
      </View>
    );

  return null;
});

export default SwiperContainer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  emptyText: {
    fontSize: 22,
    textAlign: "center",
    color: colors.textGray,
    fontWeight: "bold",
    marginHorizontal: 80,
  },
});
