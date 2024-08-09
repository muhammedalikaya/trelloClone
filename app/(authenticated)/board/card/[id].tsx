import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Card Details</Text>
      {id && <Text>Card ID: {id}</Text>}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
