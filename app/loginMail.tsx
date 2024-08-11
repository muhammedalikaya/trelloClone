import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const LoginMail = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(authenticated)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/trello-logo-gradient-blue.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-posta Adresi"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={onSignInPress}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Şifreni mi unuttun?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => router.push("/signUpMail")}
        >
          <Text style={styles.createAccountText}>Yeni Hesap Oluştur</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fontLight,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputContainer: {
    flex: 3,
    width: "90%",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: Colors.primary,
    fontSize: 14,
    textAlign: "center",
    marginVertical: 15,
  },
  createAccountButton: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  createAccountText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
