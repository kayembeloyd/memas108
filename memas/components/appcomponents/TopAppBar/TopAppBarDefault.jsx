import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Icons from "../../../assets/icons/Icons";

export default function TopAppBarDefault({
  navigation,
  title,
  back,
  profileOnPress,
  backPress,
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
      <TouchableOpacity
        onPress={() => {
          backPress ? backPress() : null;
          back ? navigation.goBack() : null;
        }}
      >
        <Icons name={"back-light"} style={styles.topAppBarIconStyles} />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          marginStart: 15,
          height: 48,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
          {title}
        </Text>
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
