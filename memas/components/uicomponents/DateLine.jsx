import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/icons/Icons";

export default function DateLine({ style, editable, dateText }) {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          backgroundColor: "#fff",
          alignItems: "center",
          height: 50,
        },
      ]}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: "#CBCBCB" }}></View>
      {editable ? (
        <TouchableOpacity
          style={{ marginHorizontal: 10, flexDirection: "row" }}
        >
          <Text style={{ color: "#4CAF50" }}>
            {dateText ? dateText : "Not Set"}
          </Text>

          <Icons style={{ marginLeft: 5 }} name="edit" />
        </TouchableOpacity>
      ) : (
        <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
          <Text style={{ color: "#4CAF50" }}>
            {dateText ? dateText : "Not Set"}
          </Text>
        </View>
      )}
      <View style={{ flex: 1, height: 1, backgroundColor: "#CBCBCB" }}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
