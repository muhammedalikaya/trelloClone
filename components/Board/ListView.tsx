import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Task, TaskList } from "@/types/enums";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DefaultTheme } from "@react-navigation/native";
import { useSupabase } from "@/context/SupabaseContext";
import DragableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";
import ListItem from "./ListItem";
export interface ListViewProps {
  taskList: TaskList;
  onDelete: () => void;
}
const ListView = ({ taskList, onDelete }: ListViewProps) => {
  const [listName, setListName] = useState<string>(taskList.title);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const {
    updateBoardList,
    deleteBoardList,
    getListCards,
    addListCard,
    updateCard,
  } = useSupabase();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    loadListTasks();
  }, []);

  const loadListTasks = async () => {
    const listTasks = await getListCards!(taskList.id);
    // console.log(listTasks);
    setTasks(listTasks);
  };

  const onAddCard = async () => {
    const addCard = await addListCard!(
      taskList.id,
      taskList.board_id,
      newTask,
      tasks.length
    );
    setIsAdding(false);
    setNewTask("");
    setTasks([...tasks, addCard]);
    // console.log(tasks);
    // console.log(addCard);
    // loadListTasks();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  const onUpdateTaskList = async () => {
    await updateBoardList!(taskList, listName);
  };
  const onDeleteList = async () => {
    onDelete();
    await deleteBoardList!(taskList.id);
    bottomSheetModalRef.current?.close();
  };

  const onTaskDropped = async (params: DragEndParams<Task>) => {
    const updatedTasks = params.data.map((task, index) => {
      return {
        ...task,
        position: index,
      };
    });
    setTasks(updatedTasks);
    updatedTasks.forEach(async (item) => {
      await updateCard!(item);
    });
  };
  return (
    <BottomSheetModalProvider>
      <View style={{ paddingTop: 20, paddingHorizontal: 30 }}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.listTitle}>{listName}</Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.present()}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color={Colors.grey}
              />
            </TouchableOpacity>
          </View>
          <DragableFlatList
            data={tasks}
            renderItem={ListItem}
            keyExtractor={(item) => item.id}
            onDragEnd={onTaskDropped}
            onDragBegin={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
            containerStyle={{ maxHeight: 200, paddingBottom: 4 }}
            contentContainerStyle={{ gap: 4 }}
          />
          {isAdding && (
            <TextInput
              autoFocus
              style={styles.input}
              placeholder="Enter a title for this card..."
              onChangeText={setNewTask}
              value={newTask}
              returnKeyType="done"
              onSubmitEditing={onAddCard}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 8,
              marginVertical: 8,
            }}
          >
            {!isAdding && (
              <>
                <TouchableOpacity
                  onPress={() => setIsAdding(true)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="add" size={18} color={Colors.grey} />
                  <Text style={{ fontSize: 12 }}>Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="image-outline"
                    size={20}
                    color={Colors.grey}
                  />
                </TouchableOpacity>
              </>
            )}
            {isAdding && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIsAdding(false);
                    setNewTask("");
                  }}
                >
                  <Text style={{ fontSize: 14, color: Colors.primary }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onAddCard}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
      <BottomSheetModal
        enablePanDownToClose
        enableOverDrag={false}
        backdropComponent={renderBackdrop}
        handleStyle={{
          backgroundColor: DefaultTheme.colors.background,
          borderRadius: 12,
        }}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              title="Cancel"
              onPress={() => bottomSheetModalRef.current?.close()}
            />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: Colors.grey, fontSize: 12, marginBottom: 5 }}>
              List name
            </Text>
            <TextInput
              style={{ fontSize: 16, color: Colors.fontDark }}
              returnKeyType="done"
              enterKeyHint="done"
              onEndEditing={onUpdateTaskList}
              onChangeText={(e) => setListName(e)}
              value={listName}
            />
          </View>
          <TouchableOpacity onPress={onDeleteList} style={styles.deleteBtn}>
            <Text style={{ color: "red" }}>Delete List</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ListView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F3EFFC",
    borderRadius: 4,
    padding: 6,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
  },
  input: {
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.2,
    borderRadius: 4,
  },
  listTitle: {
    paddingVertical: 8,
    fontWeight: "500",
  },
  deleteBtn: {
    backgroundColor: "#fff",
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  container: {
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
    gap: 16,
  },
});
