import React from "react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Stack } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { SupabaseProvider } from "@/context/SupabaseContext";

// kullanicinin jwt tokenini saklamak icin kullanilan cache
const tokenCache = {
  async getToken(key: string) {
    try {
      const clerkToken = await SecureStore.getItemAsync(key);
      if (clerkToken) {
        console.log("clerkToken : ", clerkToken);
      } else {
        console.log("No values stored under key: " + key);
      }
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
  return (
    <SupabaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
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
