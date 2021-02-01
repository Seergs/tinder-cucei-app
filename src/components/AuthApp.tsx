import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import Toast from "react-native-toast-message";
import { Matches, People } from "../navigation";
import BottomSheet, { BottomSheetOptions } from "./BottomSheet";
import TabBar from "./TabBar";

const Tabs = createBottomTabNavigator();

const AuthApp = () => {
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
      </Tabs.Navigator>
      <BottomSheet ref={modalizeRef}>
        <BottomSheetOptions />
      </BottomSheet>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default AuthApp;
