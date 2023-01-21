import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function EquipmentItem({ style, onPress }) {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          height: 96,
          marginBottom: 2,
          marginTop: 2,
          borderBottomWidth: 2,
          borderBottomColor: "#CBCBCB",
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Department: Maternity</Text>
        <Text>MMJ001</Text>
      </View>
      <Text style={{ fontWeight: "700", fontSize: 18 }}>
        Oxygen Concentrator
      </Text>
      <Text>Make: Canta</Text>
      <Text>Model: VN-WS-08</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
