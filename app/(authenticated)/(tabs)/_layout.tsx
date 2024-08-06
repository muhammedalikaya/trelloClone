import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleStyle: {
          color: Colors.fontLight,
        },
      }}
    >
      <Tabs.Screen
        name="boards"
        options={{
          title: "Boards",
          tabBarIcon: ({ size, color, focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/images/logo-icon-blue.png")
                  : require("@/assets/images/logo-icon-neutral.png")
              }
              style={{ width: size, height: size }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="my-cards"
        options={{
          title: "My Cards",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="view-dashboard-variant-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
