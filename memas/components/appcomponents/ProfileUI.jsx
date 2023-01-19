import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function ProfileUI({ style }) {
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
        <Text style={{ fontWeight: "400", fontSize: 16 }}>Lloyd Kayembe</Text>
        <Text style={{ color: "#737373" }}>Biomedical Engineer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
