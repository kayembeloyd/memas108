import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MiddleMan from "../../database/MiddleMan";

export default function MaintenanceScheduleItem({ style, onPress, equipment }) {
  const runOnce = useRef(true);

  const [departmentText, setDepartmentText] = useState("loading...");

  useEffect(() => {
    if (runOnce.current) {
      MiddleMan.departmentGet(equipment.departmentId).then((department) => {
        setDepartmentText(department.name);
      });

      runOnce.current = false;
    }
  }, []);

  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: "#AFDBB1",
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
      <Text style={[styles.item]}>
        {equipment.name} ({equipment.assetTag})
      </Text>
      <Text style={styles.item}>Preventive/Corrective maintenance</Text>
      <Text style={styles.item}>{departmentText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {},
});
