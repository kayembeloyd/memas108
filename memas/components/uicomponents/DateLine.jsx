import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/icons/Icons";

export default function DateLine({ style, editable }) {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "gold",
          height: 50,
        },
      ]}
    >
      <View style={{ flex: 1, height: 2, backgroundColor: "black" }}></View>
      {editable ? (
        <TouchableOpacity
          style={{ marginHorizontal: 10, flexDirection: "row" }}
        >
          <Text>06 Jun 2021</Text>

          <Icons style={{ marginLeft: 5 }} name="edit" />
        </TouchableOpacity>
      ) : (
        <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
          <Text>06 Jun 2021</Text>
        </View>
      )}
      <View style={{ flex: 1, height: 2, backgroundColor: "black" }}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
