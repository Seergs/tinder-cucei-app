import React from "react";
import {
  usePeopleQuery,
  useDislikeMutation,
  useLikeMutation,
} from "../../../api";
import Toast from "react-native-toast-message";
import DeckSwiper from "react-native-deck-swiper";
import Swiper from "./Swiper";
import FullpageSpinner from "../FullpageSpinner";
import { Text } from "react-native";

const SwiperContainer = React.forwardRef<DeckSwiper<any>>((_, ref) => {
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

  typeof peopleData !== "undefined" &&
    peopleData.people.__typename === "PeopleSuccess";

  const [like] = useLikeMutation();
  const [dislike] = useDislikeMutation();

  const handleLike = (index: number) => {
    if (
      typeof peopleData !== "undefined" &&
      peopleData.people.__typename === "PeopleSuccess"
    ) {
      const targetUserId = peopleData.people.people[index].id;

      like({
        variables: {
          targetUserId,
        },
      });
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
  if (isPeopleLoading) return <FullpageSpinner />;
  if (peopleError || peopleData?.people.__typename === "MeResultError")
    return <Text>Ups</Text>;

  if (peopleData && peopleData.people.__typename === "PeopleSuccess")
    return (
      <Swiper
        ref={ref}
        people={peopleData.people.people}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    );

  return null;
});

export default SwiperContainer;
