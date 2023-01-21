import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function DefaultButton({
  style,
  onPress,
  backgroundColor,
  color,
  text,
}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              backgroundColor === undefined ? "#E3E3E3" : backgroundColor,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: color === undefined ? "black" : color,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3E3E3",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 2,
    borderRadius: 5,
  },
});
