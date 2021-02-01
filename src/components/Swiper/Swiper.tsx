import React from "react";
import DeckSwiper from "react-native-deck-swiper";
import useAuth from "../../hooks/useAuth";
import UserCard from "../UserCard";

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  career: string;
  age: number;
  primaryImageUrl: string;
  interests: string[];
};

type SwiperProps = {
  people: Person[];
  currentIndex: number;
  onLike: (index: number) => void;
  onDislike: (index: number) => void;
  onFinish: () => void;
  onPress: (index: number) => void;
};

const Swiper = React.forwardRef<DeckSwiper<any>, SwiperProps>(
  ({ people, currentIndex, onLike, onDislike, onFinish, onPress }, ref) => {
    const { user } = useAuth();

    return (
      <DeckSwiper
        ref={ref}
        stackSize={people.length > 3 ? 3 : people.length}
        cards={people}
        cardIndex={currentIndex}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedRight={onLike}
        onSwipedLeft={onDislike}
        onSwipedAll={onFinish}
        onTapCard={onPress}
        backgroundColor="transparent"
        renderCard={(card) => (
          <UserCard card={card} userInterests={user.preferences.interests} />
        )}
      />
    );
  }
);
export default Swiper;
