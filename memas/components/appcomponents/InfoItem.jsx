import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
export default function InfoItem({ name, value, style }) {
  return (
    <Text style={[style, styles.item, { backgroundColor: "red" }]}>
      <Text style={styles.bold}>{name}</Text>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "600",
  },
  item: {
    marginBottom: 5,
  },
});
