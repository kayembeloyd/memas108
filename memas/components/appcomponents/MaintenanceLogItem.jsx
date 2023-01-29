import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MiddleMan from "../../database/MiddleMan";

export default function MaintenanceLogItem({ style, onPress, maintenanceLog }) {
  const runOnce = useRef(true);

  const [department, setDepartment] = useState("loading...");

  useEffect(() => {
    if (runOnce.current) {
      MiddleMan.departmentGet(maintenanceLog.equipment.departmentId).then(
        (department) => {
          setDepartment(department.name);
        }
      );

      runOnce.current = false;
    }
  }, []);

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
        <Text style={{ flex: 1 }}>Department: {department}</Text>
        <Text>{maintenanceLog.equipment.assetTag}</Text>
      </View>
      <Text style={[styles.item, { fontWeight: "700", fontSize: 18 }]}>
        {maintenanceLog.equipment.name}
      </Text>
      <Text style={styles.item}>Maintenance type: {maintenanceLog.type}</Text>
      <Text style={styles.item}>Date: {maintenanceLog.date}</Text>
      <Text style={styles.item}>Make: {maintenanceLog.equipment.make}</Text>
      <Text style={styles.item}>Model: {maintenanceLog.equipment.model}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 5,
  },
});
