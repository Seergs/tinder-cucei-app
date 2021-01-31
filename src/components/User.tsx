import React from "react";
import { NavigationProp, Route } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../styles/theme";
import Interest from "./Interest";
import Topbar from "./Topbar";
import { ScrollView } from "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
const { colors } = theme;

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  career: string;
  age: number;
  primaryImageUrl: string;
  description: string;
  preferences: {
    interests: string[];
  };
};

type UserProps = {
  navigation: NavigationProp<any>;
  route: Route<any> & {
    params: {
      user: Person;
    };
  };
};

const User = ({ navigation, route }: UserProps) => {
  const {
    age,
    firstName,
    lastName,
    career,
    description,
    preferences: { interests },
    primaryImageUrl,
  } = route.params.user;

  const { user } = useAuth();

  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" color="white" size={22} />
        </TouchableOpacity>
        <Text style={styles.topbarText}>Matches</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <AntDesign name="message1" color="white" size={22} />
        </TouchableOpacity>
      </Topbar>
      <ScrollView>
        <Image style={styles.image} source={{ uri: primaryImageUrl }} />
        <View style={styles.container}>
          <Text style={styles.name}>
            {firstName} {lastName}, <Text style={styles.age}>{age} años</Text>
          </Text>
          <Text style={styles.career}>{career}</Text>
          <View style={styles.separator} />
          <View style={styles.interests}>
            {interests.map((interest) => (
              <Interest
                isTinted={user.preferences.interests.includes(interest)}
                key={interest}
              >
                {interest}
              </Interest>
            ))}
          </View>
          <Text style={styles.bio}>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.textLightGray,
  },
  page: {
    backgroundColor: colors.bg,
    flex: 1,
    justifyContent: "space-between",
  },
  topbar: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 400,
  },
  container: {
    padding: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.textBlack,
  },
  age: {
    color: colors.textDarkGray,
  },
  career: {
    color: colors.textGray,
    marginBottom: 20,
    fontSize: 16,
  },
  interests: {
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  bio: {
    color: colors.textGray,
    letterSpacing: 1,
    textAlign: "center",
  },
});
