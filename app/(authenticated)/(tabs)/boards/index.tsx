import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Href, Link, useFocusEffect } from "expo-router";
import { useSupabase } from "@/context/SupabaseContext";

import { RefreshControl } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { Board } from "@/types/enums";

const Boards = () => {
  const { getBoards } = useSupabase();
  const [boards, setBoards] = useState<Board[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadBoards();
    }, [])
  );

  const loadBoards = async () => {
    const data = await getBoards!();
    setBoards(data);
    console.log("data:", data);
  };
  const renderItem: ListRenderItem<Board> = ({ item }) => (
    <Link
      href={
        `/(authenticated)/board/${item.id}?bg=${encodeURIComponent(
          item.background
        )}` as Href
      }
      key={item.id}
      style={styles.listItem}
      asChild
    >
      <TouchableOpacity>
        <View
          style={[styles.colorBlock, { backgroundColor: item.background }]}
        />
        <Text style={{ fontSize: 16 }}>{item.title}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={!!boards.length && styles.list}
        data={boards}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.grey,
              marginStart: 50,
            }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadBoards} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  list: {
    borderColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    gap: 10,
  },
  colorBlock: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default Boards;
