import React from "react";
import { Text } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import Toast from "react-native-toast-message";
import useAuth from "../../hooks/useAuth";
import Card from "../Card";

type SwiperProps = {
  people: {
    id: string;
    firstName: string;
    lastName: string;
    career: string;
    age: number;
    primaryImageUrl: string;
    interests: string[];
  }[];
  onLike: (index: number) => void;
  onDislike: (index: number) => void;
};

const Swiper = React.forwardRef<DeckSwiper<any>, SwiperProps>(
  ({ people, onLike, onDislike }, ref) => {
    const { user } = useAuth();
    if (!people.length) {
      return (
        <Text>
          No se encontraron personas, cambia el filtro o vuelve más tarde
        </Text>
      );
    }

    return (
      <DeckSwiper
        ref={ref}
        cards={people}
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
        onSwipedRight={onLike}
        onSwipedLeft={onDislike}
      />
    );
  }
);
export default Swiper;
