import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import theme from "../styles/theme";
const { colors } = theme;

const ACTIVE_ICONS = {
  People: "time",
  Matches: "heart",
  Options: "ellipsis-horizontal",
  Profile: "person",
};

const INACTIVE_ICONS = {
  People: "time-outline",
  Matches: "heart-outline",
  Options: "ellipsis-horizontal-outline",
  Profile: "person-outline",
};

type TabBarProps = {
  tabBarProps: BottomTabBarProps<BottomTabBarOptions>;
  onOpenBottomSheet: () => void;
};

const TabBar = ({ tabBarProps, onOpenBottomSheet }: TabBarProps) => {
  const { descriptors, state, navigation } = tabBarProps;
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const routeName = route.name as keyof typeof ACTIVE_ICONS;
        const iconName = isFocused
          ? ACTIVE_ICONS[routeName]
          : INACTIVE_ICONS[routeName];

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const handleLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarIcon
            key={label.toString()}
            iconName={iconName}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            isFocused={isFocused}
            label={label.toString()}
            onLongPress={handleLongPress}
            onPress={handlePress}
          />
        );
      })}
      <TabBarIcon
        iconName={INACTIVE_ICONS["Options"]}
        isFocused={false}
        label="Opciones"
        onPress={onOpenBottomSheet}
        onLongPress={() => {}}
        accessibilityLabel="Menu de opciones"
      />
    </View>
  );
};

export default TabBar;

type TabBarIconProps = {
  isFocused: boolean;
  label: string;
  iconName: string;
  accessibilityLabel?: string;
  onPress: () => void;
  onLongPress: () => void;
};
const TabBarIcon = ({
  isFocused,
  label,
  iconName,
  accessibilityLabel,
  onLongPress,
  onPress,
}: TabBarIconProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.5}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Ionicons
        name={iconName as any}
        size={22}
        color={isFocused ? colors.primaryOrange : colors.textGray}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 15,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  label: {
    fontSize: 10,
    color: colors.textGray,
  },
});
