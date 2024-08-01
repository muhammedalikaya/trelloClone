import React, { useRef, useState, useMemo, useCallback } from "react";
import { Colors } from "@/constants/Colors";
import { ModalType } from "@/types/enums";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import AuthModal from "@/components/AuthModal";

export default function Index() {
  //expo react-native-safe-area-context statusBar height alımı
  const { top } = useSafeAreaInsets();
  //expo react-native-dimensions ile ekran width alımı
  const { width } = Dimensions.get("window");
  //expo react-native-action-sheet ile action sheet kullanımı
  const { showActionSheetWithOptions } = useActionSheet();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["33%"], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);

  //expo react-native-modal ile modal kullanımı
  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsIndex={0}
        disappearsIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  //expo web-browser ile web browser
  const openLink = () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };

  //expo react-native-action-sheet ile action sheet kullanımı
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
        title: "Giriş yapamıyor ya da oturum açamıyor musunuz?",
      },
      (selectedIndex: any) => {
        console.log(selectedIndex);
      }
    );
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
              Oturum Aç
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
              Giriş yapamıyor ya da oturum açamıyor musunuz?
            </Text>
          </View>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        enableOverDrag={false}
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
});
