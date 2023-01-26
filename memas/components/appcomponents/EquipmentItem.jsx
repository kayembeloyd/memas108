import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MiddleMan from "../../database/MiddleMan";

export default function EquipmentItem({ style, onPress, equipment }) {
  const runOnce = useRef(true);

  const [department, setDepartment] = useState("loading...");

  useEffect(() => {
    if (runOnce) {
      MiddleMan.departmentGet(equipment.departmentId).then((department) => {
        setDepartment(department.name);
      });

      runOnce.current = false;
    }
  }, []);

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
          paddingHorizontal: 10,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flex: 1 }}>{department}</Text>
        <Text>{equipment.assetTag}</Text>
      </View>
      <Text style={{ fontWeight: "700", fontSize: 18 }}>{equipment.name}</Text>
      <Text>Make: {equipment.make}</Text>
      <Text>Model: {equipment.model}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
