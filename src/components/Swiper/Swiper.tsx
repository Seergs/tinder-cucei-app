import React from "react";
import DeckSwiper from "react-native-deck-swiper";
import useAuth from "../../hooks/useAuth";
import Card from "../Card";

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
  onLike: (index: number) => void;
  onDislike: (index: number) => void;
  onFinish: () => void;
};

const Swiper = React.forwardRef<DeckSwiper<any>, SwiperProps>(
  ({ people, onLike, onDislike, onFinish }, ref) => {
    const { user } = useAuth();

    return (
      <DeckSwiper
        ref={ref}
        stackSize={people.length > 3 ? 3 : people.length}
        cards={people}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedRight={onLike}
        onSwipedLeft={onDislike}
        onSwipedAll={onFinish}
        backgroundColor="transparent"
        renderCard={(card) => (
          <Card card={card} userInterests={user.preferences.interests} />
        )}
      />
    );
  }
);
export default Swiper;
