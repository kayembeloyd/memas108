import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function ProfileUI({ style, name, position }) {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <Image
        source={require("../../assets/images/profile.jpeg")}
        style={{ width: 66, height: 66, borderRadius: 400 / 2 }}
      />
      <View style={{ marginStart: 10, marginLeft: 10 }}>
        <Text style={{ fontWeight: "400", fontSize: 16 }}>{name}</Text>
        <Text style={{ color: "#737373" }}>{position}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
