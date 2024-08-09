import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Href, Link, useLocalSearchParams, useRouter } from "expo-router";
import { useSupabase } from "@/context/SupabaseContext";
import { Colors } from "@/constants/Colors";
import { Board, User } from "@/types/enums";
import { Ionicons } from "@expo/vector-icons";
import UserListItem from "@/components/UserListItem";

const Page = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getBoardInfo, updateBoard, deleteBoard, getBoardMember } =
    useSupabase();
  const router = useRouter();
  const [board, setBoard] = useState<Board>();
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    if (!id) return;
    loadInfo();
  }, [id]);

  const loadInfo = async () => {
    const data = await getBoardInfo!(id!);
    setBoard(data);

    const member = await getBoardMember!(id!);

    setMembers(member);
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
    <View>
      <View style={styles.container}>
        <View>
          <Text style={{ color: Colors.grey, fontSize: 12, marginBottom: 5 }}>
            Board name
          </Text>
          <TextInput
            value={board?.title}
            onChangeText={(e) => setBoard({ ...board!, title: e })}
            style={{ fontSize: 16, color: Colors.fontDark }}
            returnKeyType="done"
            enterKeyHint="done"
            onEndEditing={onUpdateBoard}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 14 }}>
          <Ionicons name="person-outline" size={18} color={Colors.fontDark} />
          <Text
            style={{ fontWeight: "bold", color: Colors.fontDark, fontSize: 16 }}
          >
            Members
          </Text>
        </View>

        <FlatList
          data={members}
          keyExtractor={(item) => `${item.id}`}
          renderItem={(item) => (
            <UserListItem
              onPress={() => {
                console.log("userID :", item.item.id);
              }}
              element={item}
            />
          )}
          contentContainerStyle={{ gap: 8 }}
          style={{ marginVertical: 12 }}
        />

        <Link
          href={`/(authenticated)/board/invite?id=${id}` as Href<string>}
          asChild
        >
          <TouchableOpacity style={styles.fullBtn}>
            <Text style={{ fontSize: 16, color: Colors.fontLight }}>
              Manage board members
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={{ color: "red" }}>Delete Board</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    padding: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteBtn: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  fullBtn: {
    backgroundColor: Colors.primary,
    padding: 12,
    marginLeft: 32,
    marginRight: 16,
    marginTop: 8,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Page;
