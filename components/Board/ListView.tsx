import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TaskList } from "@/types/enums";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface ListViewProps {
  taskList: TaskList;
  onDelete: (id: string) => void;
}
const ListView = ({ taskList, onDelete }: ListViewProps) => {
  const [listName, setListName] = useState<string>(taskList.title);

  return (
    <View style={{ paddingTop: 20, paddingHorizontal: 30 }}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.listTitle}>{listName}</Text>
          {/* <Text onPress={() => onDelete(taskList.id)}>Delete</Text> */}
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3EFFC",
    borderRadius: 10,
    padding: 6,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  listTitle: {
    paddingVertical: 8,
    fontWeight: "500",
  },
});
