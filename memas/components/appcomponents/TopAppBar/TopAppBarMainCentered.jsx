import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Icons from "../../../assets/icons/Icons";

export default function TopAppBarMainCentered({
  navigation,
  title,
  back,
  profileOnPress,
}) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4CAF50",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingStart: 20,
          height: 48,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
      </View>

      <TouchableOpacity onPress={profileOnPress}>
        <Icons name={"profile"} style={styles.topAppBarIconStyles} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topAppBarIconStyles: {
    height: 42,
    width: 42,
    marginHorizontal: 2,
  },
});
