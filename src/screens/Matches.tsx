import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useMatchesQuery } from "../../api";
import theme from "../styles/theme";
import FullpageSpinner from "../components/FullpageSpinner";
import useAuth from "../hooks/useAuth";
import Topbar from "../components/Topbar";
import UserCard from "../components/UserCardMin";
import User from "../components/User";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const { colors } = theme;

const MatchesStack = createStackNavigator();

export const MatchesStackNavigator = () => {
  return (
    <MatchesStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide,
      }}
    >
      <MatchesStack.Screen name="Matches" component={Matches} />
      <MatchesStack.Screen name="User" component={User} />
    </MatchesStack.Navigator>
  );
};

type MatchesProps = {
  navigation: BottomTabNavigationProp<any>;
};

const Matches = ({ navigation }: MatchesProps) => {
  const { data, loading, error, refetch } = useMatchesQuery({
    pollInterval: 60000,
  });
  const { user } = useAuth();

  if (loading) return <FullpageSpinner />;
  if (error) return <Text>Ups</Text>;
  if (typeof data === "undefined") return null;

  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <Text style={styles.topbarText}>Matches</Text>
      </Topbar>
      <FlatList
        style={{ alignSelf: "center" }}
        data={data.matches}
        horizontal={false}
        numColumns={2}
        refreshing={loading}
        onRefresh={refetch}
        contentContainerStyle={styles.list}
        renderItem={({ item: match }) => {
          const matchUser =
            match.userOne.id === user.id ? match.userTwo : match.userOne;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("User", { user: matchUser })}
            >
              <UserCard user={matchUser} createdAt={match.createdAt} />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => (
          <Text>Aún no hay matches, comienza a deslizar</Text>
        )}
      />
    </View>
  );
};
export default Matches;

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
  list: {
    marginTop: 10,
    paddingVertical: 10,
  },
});
const forSlide = ({ current, next, inverted, layouts: { screen } }: any) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
    },
  };
};
