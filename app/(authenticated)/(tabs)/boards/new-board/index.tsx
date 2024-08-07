import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Href,
  Link,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT_COLOR } from "@/types/enums";

const Page = () => {
  const [boardName, setBoardName] = useState("");
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
  const { bg } = useGlobalSearchParams<{ bg?: string }>();
  const router = useRouter();

  const onCreateBoard = async () => {};

  useEffect(() => {
    console.log("BG changed:", bg);
    if (bg) {
      setSelectedColor(bg);
    }
  }, [bg]);

  return (
    <View style={{ marginVertical: 10 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={onCreateBoard}
              disabled={boardName === ""}
            >
              <Text
                style={
                  boardName === "" ? styles.btnTextDisabled : styles.btnText
                }
              >
                Create
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <TextInput
        style={styles.input}
        value={boardName}
        onChangeText={setBoardName}
        placeholder=""
        autoFocus
      ></TextInput>
      <Link
        href={
          "/(authenticated)/(tabs)/boards/new-board/color-select" as Href<string>
        }
        asChild
      >
        <TouchableOpacity style={styles.btnItem}>
          <Text style={styles.btnItemText}>Arka Plan Rengi</Text>
          <View
            style={[styles.colorPreview, { backgroundColor: selectedColor }]}
          />
          <Ionicons name="chevron-forward" size={22} color={Colors.grey} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primary,
  },
  btnTextDisabled: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.grey,
  },
  input: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    backgroundColor: "white",
    padding: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    marginBottom: 32,
  },
  btnItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
  },
  btnItemText: {
    fontSize: 16,
    flex: 1,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});

export default Page;
