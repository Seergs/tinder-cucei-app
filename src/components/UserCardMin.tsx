import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { formatDateToHuman } from "../utils/utils";
import theme from "../styles/theme";
const { colors } = theme;

type UserCardProps = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    primaryImageUrl: string;
  };
  createdAt: Date;
};

const UserCard = ({ user, createdAt }: UserCardProps) => {
  const { firstName, primaryImageUrl, lastName } = user;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: primaryImageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.date}>{formatDateToHuman(createdAt)}</Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 180,
    height: 180,
  },
  textContainer: {
    padding: 8,
  },
  name: {
    fontWeight: "bold",
    color: colors.textBlack,
    fontSize: 16,
  },
  date: {
    color: colors.textDarkGray,
  },
});
