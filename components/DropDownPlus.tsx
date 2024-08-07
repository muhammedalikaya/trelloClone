import { Text, TouchableOpacity } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";

const DropDownPlus = () => {
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color="white" />
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item
            key="board"
            onSelect={() =>
              router.push(
                "/(authenticated)/(tabs)/boards/new-board" as Href<string>
              )
            }
          >
            <DropdownMenu.ItemTitle>Create a board</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "square.split.2x1",
                pointSize: 24,
              }}
            ></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="card" onSelect={() => router.push()}>
            <DropdownMenu.ItemTitle>Create a card</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "square.topthird.inset.filled",
                pointSize: 24,
              }}
            ></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Item
          key="templates"
          onSelect={() =>
            router.push(
              "/(authenticated)/(tabs)/boards/templates" as Href<string>
            )
          }
        >
          <DropdownMenu.ItemTitle>Browse Templates</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropDownPlus;
