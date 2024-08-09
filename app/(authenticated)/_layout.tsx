import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
      <Stack.Screen
        name={"board/settings"}
        options={{
          presentation: "modal",
          title: "Board Menu",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="#716E75" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={"board/invite"}
        options={{
          presentation: "modal",
          title: "Manage board members",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#E3DFE9",
                padding: 6,
                borderRadius: 16,
              }}
            >
              <Ionicons name="close" size={24} color="#716E75" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
