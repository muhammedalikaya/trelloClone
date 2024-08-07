import React from "react";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Image, TouchableOpacity } from "react-native";
import DropDownPlus from "@/components/DropDownPlus";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitle: () => (
            <Image
              source={require("@/assets/images/trello-logo-gradient-white.png")}
              style={{ width: 120, height: 50, resizeMode: "contain" }}
            />
          ),
          headerRight: () => <DropDownPlus />,
        }}
      />
      <Stack.Screen
        name="new-board"
        options={{ headerShown: false, presentation: "modal" }}
      />

      <Stack.Screen
        name="templates"
        options={{
          title: "Start with a template",
          presentation: "fullScreenModal",

          headerRight: () => (
            <TouchableOpacity
              style={{
                backgroundColor: "#E3DFE9",
                borderRadius: 20,
                padding: 6,
              }}
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={20} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
