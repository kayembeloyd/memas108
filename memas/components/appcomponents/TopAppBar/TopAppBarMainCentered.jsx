import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Icons from "../../../assets/icons/Icons";

export default function TopAppBarMainCentered({ navigation, title, back }) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9DDFF",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          back ? navigation.goBack() : null;
        }}
      >
        <Icons
          name={back ? "back" : "menu"}
          style={styles.topAppBarIconStyles}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: 48,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
      </View>

      <Icons name={"profile"} style={styles.topAppBarIconStyles} />
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
