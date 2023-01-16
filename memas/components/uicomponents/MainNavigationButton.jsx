import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function MainNavigationButton({ style, text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          {
            width: 130,
            backgroundColor: "grey",
            height: "100%",
          },
        ]}
      >
        <View
          style={{ height: 130, backgroundColor: "indigo", borderRadius: 10 }}
        ></View>
        <Text style={{ textAlign: "center", backgroundColor: "yellow" }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({ container: {} });
