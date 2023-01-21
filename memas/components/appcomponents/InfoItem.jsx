import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
export default function InfoItem({ name, value, style }) {
  return (
    <Text style={[style, styles.item]}>
      <Text style={styles.bold}>{name} </Text>
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "700",
  },
  item: {
    marginBottom: 5,
    fontSize: 16,
  },
});
