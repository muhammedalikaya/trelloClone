import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AuthModalProps, AuthStrategy, ModalType } from "@/types/enums";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSignUp, useSignIn, useOAuth, useAuth } from "@clerk/clerk-expo";
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser";

// Define a constant array for authentication options
const LOGIN_OPTIONS = [
  {
    text: "Google",
    icon: require("@/assets/images/login/google.png"),
    strategy: AuthStrategy.Google,
  },
  {
    text: "Apple",
    icon: require("@/assets/images/login/apple.png"),
    strategy: AuthStrategy.Apple,
  },
  {
    text: "Microsoft",
    icon: require("@/assets/images/login/microsoft.png"),
    strategy: AuthStrategy.Microsoft,
  },
];
WebBrowser.maybeCompleteAuthSession();
const AuthModal = ({ authType }: AuthModalProps) => {
  const { isSignedIn } = useAuth();
  useWarmUpBrowser();

  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: AuthStrategy.Google,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: AuthStrategy.Apple,
  });
  const { startOAuthFlow: microsoftAuth } = useOAuth({
    strategy: AuthStrategy.Microsoft,
  });

  // Clerk OAuth flow
  const onSelectedAuth = async (strategy: AuthStrategy) => {
    if (!signUp || !signIn) return;

    const selectedAuth = {
      [AuthStrategy.Google]: googleAuth,
      [AuthStrategy.Apple]: appleAuth,
      [AuthStrategy.Microsoft]: microsoftAuth,
    }[strategy];

    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      // If the sign-in process is complete, set the user as the active session
      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the OAuth account exists but the user does not have an app account, create a new account
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      // Create a new user account
      const res = await signUp.create({
        transfer: true,
      });

      // If the signup process is complete, set the user as the active session
      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      // If the user already has an app account and is linked, sign in
      try {
        // Start the selected OAuth flow
        const { createdSessionId, setActive } = await selectedAuth();
        console.log("OAuth flow started: ", createdSessionId);
        // If a new session ID is created, set it as the active session
        if (createdSessionId) {
          setActive!({ session: createdSessionId });
          console.log("Session created: ", createdSessionId);
        }
      } catch (error) {
        console.error("Auth error: ", error);
      }
    }
  };

  return (
    <BottomSheetView style={styles.modalContainer}>
      {/* Button for signing in or signing up with email */}
      <TouchableOpacity style={styles.modalBtn}>
        <Ionicons name="mail-outline" size={24} color="black" />
        <Text style={styles.btnText}>
          {authType === ModalType.Login
            ? "E-posta ile Oturum Açın"
            : "E-posta ile Kaydolun"}
        </Text>
      </TouchableOpacity>

      {LOGIN_OPTIONS.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.modalBtn}
          onPress={() => onSelectedAuth(option.strategy!)}
        >
          <Image source={option.icon} style={styles.btnIcon} />
          <Text style={styles.btnText}>
            {authType === ModalType.Login
              ? option.text + " ile Oturum Aç"
              : option.text + " ile Kayıt Ol"}
          </Text>
        </TouchableOpacity>
      ))}
    </BottomSheetView>
  );
};

// Style definitions
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "flex-start",
    padding: 20,
    gap: 10,
    backgroundColor: Colors.fontLight,
  },
  modalBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.fontLight,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: Colors.fontLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  btnText: {
    fontSize: 16,
    color: Colors.fontDark,
    fontWeight: "600",
  },
});

export default AuthModal;
