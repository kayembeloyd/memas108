import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import MainNavigationButton from "../components/uicomponents/MainNavigationButton";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginBottom: 60,
            flex: 1,
            backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <View style={styles.row}>
            <MainNavigationButton
              text="Equipment"
              onPress={() => {
                navigation.navigate("EquipmentScreen");
              }}
            />
          </View>
          <View style={styles.row}>
            <MainNavigationButton
              text="Preventive Maintenance"
              style={styles.mainNavigationButton}
              onPress={() => {
                navigation.navigate("AddMaintenanceLogScreen");
              }}
            />
            <MainNavigationButton
              text={"Corrective Maintenance"}
              onPress={() => {
                navigation.navigate("AddMaintenanceLogScreen");
              }}
            />
          </View>
          <View style={styles.row}>
            <MainNavigationButton
              text="Maintenance Logs"
              style={styles.mainNavigationButton}
              onPress={() => {
                navigation.navigate("MaintenanceLogsScreen");
              }}
            />
            <MainNavigationButton
              text="Maintenance Schedule"
              onPress={() => {
                navigation.navigate("MaintenanceScheduleScreen");
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow",
        }}
      >
        <ScanBottomSheet />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  row: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 10,
    backgroundColor: "green",
    width: "95%",
    maxWidth: 700,
  },

  mainNavigationButton: {
    marginRight: 26,
  },
});
