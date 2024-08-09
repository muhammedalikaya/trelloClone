import { Task } from "@/types/enums";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const ListItem = ({ item, drag, isActive }: RenderItemParams<Task>) => {
  const router = useRouter();
  const openLink = () => {
    router.push(`/board/card/${item.id}`);
  };
  return (
    <ScaleDecorator>
      <TouchableOpacity
        onPress={openLink}
        onLongPress={drag}
        disabled={isActive}
        style={[styles.rowItem, { opacity: isActive ? 0.5 : 1 }]}
      >
        {!item.image_url && (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  rowItem: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});
