import React, { useRef, useState, useMemo, useCallback } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import AuthModal from "@/components/AuthModal";
import { Colors } from "@/constants/Colors";
import { ModalType } from "@/types/enums";
import { useSupabase } from "@/context/SupabaseContext";

export default function Index() {
  // Safe area insets
  const { top } = useSafeAreaInsets();

  // Action sheet
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = async () => {
    const options = [
      "Destek dökümanlarını görüntüleyin",
      "Destek ekibiyle iletişim kurun",
      "İptal",
    ];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Giriş yapamıyor musunuz?",
      },
      (selectedIndex: any) => {
        console.log(selectedIndex);
      }
    );
  };

  // Bottom sheet modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Modal type state
  const [authType, setAuthType] = useState<ModalType | null>(null);

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  };

  const snapPoints = useMemo(() => ["40%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.4}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  // Open link
  const openLink = () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { paddingTop: top + 30 }]}>
        <Image
          source={require("@/assets/images/login/trello.png")}
          style={styles.image}
        />
        <Text style={styles.introText}>
          Hareket halindeyken dahi takım çalışmanızı ilerletin
        </Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#fff" }]}
            onPress={() => showModal(ModalType.Login)}
          >
            <Text style={[styles.btnText, { color: Colors.primary }]}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => showModal(ModalType.SignUp)}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>Üye Ol</Text>
          </TouchableOpacity>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Kaydolarak{" "}
              <Text style={styles.link} onPress={openLink}>
                Hizmet şartları
              </Text>{" "}
              ve{" "}
              <Text style={styles.link} onPress={openLink}>
                Gizlilik Politikası
              </Text>{" "}
              <Text>koşullarını kabul edersiniz.</Text>
            </Text>
            <Text
              style={[styles.link, { marginTop: "4%" }]}
              onPress={openActionSheet}
            >
              Giriş yapamıyor musun?
            </Text>
          </View>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={() => <View style={styles.handle} />}
        backdropComponent={renderBackdrop}
        enableOverDrag={true}
        enablePanDownToClose
      >
        <AuthModal authType={authType} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  image: {
    height: Dimensions.get("window").height / 2,
    paddingHorizontal: 40,
    resizeMode: "contain",
  },
  introText: {
    fontWeight: "600",
    color: Colors.fontLight,
    fontSize: 20,
    padding: 30,
  },
  bottomContainer: {
    width: "100%",
    gap: 10,
    paddingHorizontal: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderColor: Colors.fontLight,
    borderWidth: 1,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    width: "100%",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    marginHorizontal: 60,
  },
  link: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  descriptionContainer: {
    width: "100%",
    alignItems: "center",
  },
  // Yeni stiller
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    height: 5,
    width: 40,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
});
