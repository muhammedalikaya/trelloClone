import { Colors } from "@/constants/Colors";
import { User } from "@/types/enums";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";

interface UserListItemProps {
  element: ListRenderItemInfo<User>;
  onPress: (user: User) => void;
}

const UserListItem = ({ element: { item }, onPress }: UserListItemProps) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
    <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
    <View>
      <Text style={styles.name}>{item.first_name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f3f3f3",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Tam daire için yarı çapı boyutun yarısına ayarladık
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.fontDark,
  },
  email: {
    color: Colors.grey,
    fontSize: 14,
  },
});

export default UserListItem;
