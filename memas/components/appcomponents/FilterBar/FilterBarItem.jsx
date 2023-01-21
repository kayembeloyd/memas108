import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FilterBarItem({ title, value }) {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text style={{ color: "#E6F1E7", fontWeight: "700" }}>{title}</Text>
      <Text style={{ color: "#E6F1E7" }}>{value}</Text>
    </TouchableOpacity>
  );
}
