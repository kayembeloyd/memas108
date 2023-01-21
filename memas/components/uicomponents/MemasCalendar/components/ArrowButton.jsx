import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ArrowButton({ side, style, onPress }) {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={onPress}
    >
      <View>
        {side === "left" ? (
          <Ionicons name="caret-back" size={18} color="black" />
        ) : (
          <Ionicons name="caret-forward" size={18} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
}
