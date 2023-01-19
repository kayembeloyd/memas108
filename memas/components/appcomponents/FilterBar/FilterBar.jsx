import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

export default function FilterBar({ style, children }) {
  return (
    <View
      style={[
        style,
        {
          height: 50,
          backgroundColor: "blue",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <ScrollView horizontal>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
