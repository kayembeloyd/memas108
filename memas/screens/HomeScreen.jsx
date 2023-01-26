import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";

import { getHeaderTitle } from "@react-navigation/elements";
import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import MainNavigationButton from "../components/uicomponents/MainNavigationButton";
import TopAppBarMainCentered from "../components/appcomponents/TopAppBar/TopAppBarMainCentered";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";

export default function HomeScreen({ navigation }) {
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarMainCentered
              title={title}
              back={back}
              s
              navigation={navigation}
              profileOnPress={() => {
                setProfileModalVisibility(true);
              }}
            />
          );
        },
      });
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ProfileModalScreen
        visible={profileModalVisibility}
        onRequestClose={() => {
          setProfileModalVisibility(false);
        }}
        onAddEquipmentPress={() => {
          setProfileModalVisibility(false);
          navigation.navigate("AddEquipmentScreen");
        }}
      />

      <ScrollView>
        <View
          style={{
            marginBottom: 60,
            flex: 1,
            alignItems: "center",
          }}
        >
          <View style={styles.row}>
            <MainNavigationButton
              text="Equipment"
              onPress={() => {
                navigation.navigate("EquipmentScreen");
              }}
              image={"equipment"}
            />
          </View>
          <View style={styles.row}>
            <MainNavigationButton
              text="Preventive Maintenance"
              style={styles.mainNavigationButton}
              onPress={() => {
                navigation.navigate("AddMaintenanceLogScreen");
              }}
              image={"preventive-maintenance"}
            />
            <MainNavigationButton
              text={"Corrective Maintenance"}
              onPress={() => {
                navigation.navigate("AddMaintenanceLogScreen");
              }}
              image={"corrective-maintenance"}
            />
          </View>
          <View style={styles.row}>
            <MainNavigationButton
              text="Maintenance Logs"
              style={styles.mainNavigationButton}
              onPress={() => {
                navigation.navigate("MaintenanceLogsScreen");
              }}
              image={"maintenance-logs"}
            />
            <MainNavigationButton
              text="Maintenance Schedule"
              onPress={() => {
                navigation.navigate("MaintenanceScheduleScreen");
              }}
              image={"maintenance-schedule"}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
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
    width: "95%",
    maxWidth: 700,
  },

  mainNavigationButton: {
    marginRight: 26,
  },
});
