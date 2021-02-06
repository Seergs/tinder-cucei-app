import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef, useState, useEffect } from "react";
import { Modalize } from "react-native-modalize";
import Toast from "react-native-toast-message";
import { Matches, People } from "../navigation";
import BottomSheet, { BottomSheetOptions } from "./BottomSheet";
import TabBar from "./TabBar";
import { useSetTokenMutation } from "../../api";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { Subscription } from "@unimodules/core";
import Profile from "../screens/Profile";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tabs = createBottomTabNavigator();

const AuthApp = () => {
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [setToken] = useSetTokenMutation();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setToken({
          variables: {
            token,
          },
        })
          .then((res) => {
            if (!res.data?.setExpoPushToken) {
              console.log("Something went wrong");
            }
          })
          .catch((err) => console.log(err));
      }
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const modalizeRef = useRef<Modalize>(null);

  const [peopleIndex, setPeopleIndex] = useState(0);

  const handleOpenBottomSheet = () => {
    modalizeRef.current?.open();
  };

  const handleSwipe = () => {
    setPeopleIndex((prev) => prev + 1);
  };

  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBar={(props) => (
          <TabBar
            tabBarProps={props}
            onOpenBottomSheet={handleOpenBottomSheet}
          />
        )}
      >
        <Tabs.Screen
          name="People"
          options={{
            tabBarLabel: "Personas",
          }}
        >
          {(props) => (
            <People
              onSwipe={handleSwipe}
              peopleIndex={peopleIndex}
              {...props}
            />
          )}
        </Tabs.Screen>
        <Tabs.Screen
          name="Matches"
          component={Matches}
          options={{
            tabBarLabel: "Matches",
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Perfil",
          }}
        />
      </Tabs.Navigator>
      <BottomSheet ref={modalizeRef}>
        <BottomSheetOptions />
      </BottomSheet>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AuthApp;

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for notifications");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for push notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
