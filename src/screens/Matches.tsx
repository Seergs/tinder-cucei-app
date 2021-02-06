import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useMatchesQuery } from "../../api";
import theme from "../styles/theme";
import FullpageSpinner from "../components/FullpageSpinner";
import useAuth from "../hooks/useAuth";
import Topbar from "../components/Topbar";
import UserCard from "../components/UserCardMin";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Route } from "@react-navigation/native";
const { colors } = theme;

type MatchesProps = {
  navigation: BottomTabNavigationProp<any>;
  route: Route<any>;
};

const Matches = ({ navigation, route }: MatchesProps) => {
  const { data, loading, error, refetch } = useMatchesQuery();
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
              onPress={() =>
                navigation.navigate("User", {
                  user: matchUser,
                  from: route.name,
                })
              }
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
