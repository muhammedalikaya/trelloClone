import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSupabase } from "@/context/SupabaseContext";
import { Colors } from "@/constants/Colors";
import { Board } from "@/types/enums";

const Page = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getBoardInfo, updateBoard, deleteBoard } = useSupabase();
  const router = useRouter();
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    if (!id) return;
    loadInfo();
  }, [id]);

  const loadInfo = async () => {
    const data = await getBoardInfo!(id!);
    setBoard(data);
  };
  const onUpdateBoard = async () => {
    const updated = await updateBoard!(board!);
    setBoard(updated);
  };
  const onDelete = async () => {
    await deleteBoard!(`${id}`);
    router.dismissAll();
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.grey, fontSize: 12, marginBottom: 5 }}>
        Board Name
      </Text>
      <TextInput
        value={board?.title}
        onChangeText={(text) => setBoard({ ...board!, title: text })}
        style={{ fontSize: 16, color: Colors.fontDark }}
        returnKeyType="done"
        enterKeyHint="done"
        onEndEditing={onUpdateBoard}
      />

      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
        <Text style={{ color: "red" }}>Delete Board</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  deleteBtn: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
  },
  fullBtn: {
    backgroundColor: Colors.primary,
    padding: 8,
    marginLeft: 32,
    marginRight: 16,
    marginTop: 8,
    borderRadius: 6,
    alignItems: "center",
  },
});

export default Page;
