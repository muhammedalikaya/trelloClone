import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(authenticated)");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
          {!pendingVerification && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Ad"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Soyad"
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={styles.input}
                placeholder="E-posta"
                keyboardType="email-address"
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
              <TouchableOpacity
                style={styles.registerButton}
                onPress={onSignUpPress}
              >
                <Text style={styles.registerButtonText}>Kayıt Ol</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText}>
                  Zaten bir hesabınız var mı? Giriş Yap
                </Text>
              </TouchableOpacity>
            </>
          )}
          {pendingVerification && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Doğrulama Kodu"
                value={code}
                onChangeText={setCode}
              />
              <TouchableOpacity
                style={styles.registerButton}
                onPress={onPressVerify}
              >
                <Text style={styles.registerButtonText}>Kodu Doğrula</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  inputContainer: {
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
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
