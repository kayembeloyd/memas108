import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ListItemButton({ style, text, onPress }) {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "red",
        },
      ]}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
