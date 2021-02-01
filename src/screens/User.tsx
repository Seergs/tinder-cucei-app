import React from "react";
import { NavigationProp, Route } from "@react-navigation/native";
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  TouchableOpacity,
  NativeScrollEvent,
} from "react-native";
import theme from "../styles/theme";
import Interest from "../components/Interest";
import Topbar from "../components/Topbar";
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
  interests: string[];
};

type UserProps = {
  navigation: NavigationProp<any>;
  route: Route<any> & {
    params: {
      user: Person;
      from: string;
    };
  };
};

const User = ({ navigation, route }: UserProps) => {
  const { user: userProfile, from } = route.params;
  const {
    age,
    firstName,
    lastName,
    career,
    description,
    preferences,
    interests,
    primaryImageUrl,
    secondaryImagesUrl,
  } = userProfile;

  const userInterests = preferences ? preferences.interests : interests;

  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const images = [primaryImageUrl, ...secondaryImagesUrl];

  const handleImageChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentImageIndex(Math.round(e.nativeEvent.contentOffset.x / WIDTH));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <Topbar
        displayStyles={
          from === "Matches"
            ? styles.topbarMessage
            : {
                justifyContent: "center",
              }
        }
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleGoBack}
          style={from === "People" ? styles.topbarLeftButton : {}}
        >
          <AntDesign name="left" color="white" size={22} />
        </TouchableOpacity>
        <Text
          style={
            from === "People"
              ? [styles.topbarTextAlone, styles.topbarText]
              : styles.topbarText
          }
        >
          Matches
        </Text>
        {from === "Matches" && (
          <TouchableOpacity activeOpacity={0.8}>
            <AntDesign name="message1" color="white" size={22} />
          </TouchableOpacity>
        )}
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
            {userInterests.map((interest) => (
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
  topbarMessage: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topbarLeftButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 2,
  },
  topbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  topbarTextAlone: {
    textAlign: "center",
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
