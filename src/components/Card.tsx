import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import theme from "../styles/theme";
const { colors } = theme;

type CardProps = {
  card: {
    firstName: string;
    lastName: string;
    age: number;
    career: string;
    interests: string[];
    primaryImageUrl: string;
  };
  userInterests: string[];
};

export default function Card({
  card: { firstName, lastName, age, career, interests, primaryImageUrl },
  userInterests,
}: CardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: primaryImageUrl }} style={styles.image} />
      <Text style={styles.personName}>
        {firstName} {lastName}, {age}
      </Text>
      <Text style={styles.career}>{career}</Text>
      <View style={styles.separator} />
      <View style={styles.interests}>
        {interests.map((interest) => (
          <Text
            key={interest}
            style={
              userInterests.includes(interest)
                ? styles.interestsCommon
                : styles.interest
            }
          >
            {interest}
          </Text>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 400,
    alignSelf: "center",
  },
  personName: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.textBlack,
  },
  career: {
    color: colors.textGray,
    marginBottom: 20,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.textLightGray,
  },
  interests: {
    marginTop: 20,
    flexDirection: "row",
    overflow: "hidden",
  },
  interest: {
    marginRight: 10,
    color: colors.textGray,
  },
  interestsCommon: {
    marginRight: 10,
    color: colors.primaryOrange,
    fontWeight: "bold",
  },
});
