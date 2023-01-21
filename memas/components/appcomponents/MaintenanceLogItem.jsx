import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function MaintenanceLogItem({ style, onPress }) {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          height: 148,
          marginBottom: 2,
          marginTop: 2,
          borderBottomColor: "#CBCBCB",
          borderBottomWidth: 1,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>Department: Maternity</Text>
        <Text>MMJ001</Text>
      </View>
      <Text style={[styles.item, { fontWeight: "700", fontSize: 18 }]}>
        Oxygen Concentrator
      </Text>
      <Text style={styles.item}>Maintenance type: Preventive maintenance</Text>
      <Text style={styles.item}>Date: 06 Nov 2022</Text>
      <Text style={styles.item}>Make: Canta</Text>
      <Text style={styles.item}>Model: VN-WS-08</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 5,
  },
});
