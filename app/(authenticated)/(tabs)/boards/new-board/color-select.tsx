import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { DEFAULT_COLOR, COLORS } from "@/types/enums";

import { Colors } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

const Page = () => {
  const [selected, setSelected] = useState(DEFAULT_COLOR);
  const router = useRouter();

  const onColorSelect = (color: string) => {
    router.setParams({ bg: color });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          onPress={() => {
            onColorSelect(color);
            setSelected(color);
          }}
          style={{
            width: 100,
            height: 100,
            margin: 5,
            borderRadius: 4,
            backgroundColor: color,
            borderWidth: selected === color ? 2 : 0,
            borderColor: Colors.fontDark,
          }}
        ></TouchableOpacity>
      ))}
    </View>
  );
};

export default Page;
