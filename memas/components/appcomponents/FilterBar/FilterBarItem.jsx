import React from "react";
import { Text, View } from "react-native";

export default function FilterBarItem({ title, value }) {
  return (
    <View
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: "grey",
      }}
    >
      <Text style={{ fontWeight: "500" }}>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}
