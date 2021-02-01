import React from "react";
import { NavigationProp, Route } from "@react-navigation/native";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import theme from "../styles/theme";
import Interest from "./Interest";
import Topbar from "./Topbar";
import { ScrollView } from "react-native-gesture-handler";
import useAuth from "../hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { WIDTH } from "../constants";
const { colors } = theme;

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  career: string;
  age: number;
  primaryImageUrl: string;
  secondaryImagesUrl: string[];
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
    secondaryImagesUrl,
  } = route.params.user;

  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const images = [primaryImageUrl, ...secondaryImagesUrl];

  const handleImageChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentImageIndex(Math.round(e.nativeEvent.contentOffset.x / WIDTH));
  };

  return (
    <View style={styles.page}>
      <Topbar displayStyles={styles.topbar}>
        <TouchableOpacity activeOpacity={0.8} onPress={navigation.goBack}>
          <AntDesign name="left" color="white" size={22} />
        </TouchableOpacity>
        <Text style={styles.topbarText}>Matches</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <AntDesign name="message1" color="white" size={22} />
        </TouchableOpacity>
      </Topbar>
      <ScrollView>
        <FlatList
          keyExtractor={(_, i) => `userImage-${i}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={0}
          onScroll={handleImageChange}
          data={images}
          renderItem={({ item }) => {
            return <Image style={styles.image} source={{ uri: item }} />;
          }}
        />
        <View style={styles.imageIndexContainer}>
          <Text style={styles.imageIndex}>
            {currentImageIndex + 1}/{images.length}
          </Text>
        </View>
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
    width: WIDTH,
    height: WIDTH,
  },
  container: {
    padding: 20,
    paddingTop: 0,
    marginTop: -30,
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
  imageIndexContainer: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "relative",
    top: -51,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  imageIndex: {
    color: "white",
    fontWeight: "bold",
  },
});
