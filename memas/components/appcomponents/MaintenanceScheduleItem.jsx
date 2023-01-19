import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function MaintenanceScheduleItem({ style, onPress }) {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: "green",
          height: 68,
          marginBottom: 5,
          marginTop: 5,
          paddingHorizontal: 10,
          paddingTop: 5,
          marginRight: 10,
          marginLeft: 50,
          borderRadius: 5,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.item]}>Oxygen Concentrator (MMJ001)</Text>
      <Text style={styles.item}>Preventive maintenance</Text>
      <Text style={styles.item}>Labour Ward</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {},
});
