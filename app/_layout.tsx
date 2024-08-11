import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Href, Stack, useRouter, useSegments } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { SupabaseProvider } from "@/context/SupabaseContext";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// kullanicinin jwt tokenini saklamak icin kullanilan cache
const tokenCache = {
  async getToken(key: string) {
    try {
      const clerkToken = await SecureStore.getItemAsync(key);
      // if (clerkToken) {
      //   console.log("clerkToken : ", clerkToken);
      // } else {
      //   console.log("No values stored under key: " + key);
      // }
      return clerkToken;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
// clerk icin public key
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY! as string;

const InitialLayout = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/boards" as Href<string>);
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SupabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="loginMail"
          options={{
            headerTitle: () => (
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                E-posta ile Oturum Açın
              </Text>
            ),
            headerStyle: { backgroundColor: Colors.fontLight },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="signUpMail"
          options={{
            headerTitle: () => (
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                E-posta ile Kaydolun
              </Text>
            ),
            headerStyle: { backgroundColor: Colors.fontLight },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack>
    </SupabaseProvider>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ActionSheetProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <InitialLayout />
          </GestureHandlerRootView>
        </ActionSheetProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
