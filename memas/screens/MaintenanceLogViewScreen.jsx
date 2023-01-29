import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import InfoItem from "../components/appcomponents/InfoItem";
import CardUI from "../components/uicomponents/CardUI";
import DateLine from "../components/uicomponents/DateLine";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import MiddleMan from "../database/MiddleMan";

export default function MaintenanceLogViewScreen({ navigation, route }) {
  const { item } = route.params;
  const maintenanceLog = item;

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const { height, width } = useWindowDimensions();

  const runOnce = useRef(true);

  const [department, setDepartment] = useState("loading...");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (runOnce) {
      MiddleMan.departmentGet(maintenanceLog.equipment.departmentId).then(
        (department) => {
          setDepartment(department.name);
        }
      );

      MiddleMan.userGet(0).then((user) => {
        setUser(user);
      });

      runOnce.current = false;
    }
  }, []);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          return (
            <TopAppBarDefault
              title={"Maintenance Log #" + maintenanceLog.id}
              back={back}
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
    <ScrollView
      style={{
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "100%",
        paddingHorizontal: 10,
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
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

      <DateLine
        style={{ width: 800, maxWidth: 900 }}
        dateText={maintenanceLog.date}
      />

      <View
        style={{
          width: "100%",
          maxWidth: 900,
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>Department: {department}</Text>
          <Text>{maintenanceLog.equipment.assetTag}</Text>
        </View>
        <Text style={[styles.item, { fontWeight: "700", fontSize: 18 }]}>
          {maintenanceLog.equipment.name}
        </Text>
        <Text style={styles.item}>Make: {maintenanceLog.equipment.make}</Text>
        <Text style={styles.item}>Model: {maintenanceLog.equipment.model}</Text>
      </View>

      <View style={{ width: "100%", maxWidth: 900, marginVertical: 15 }}>
        <Text style={{ fontSize: 18 }}>Maintenance Type:</Text>
        <Text style={{ fontSize: 16 }}>Preventive maintenance</Text>
      </View>

      <View style={{ width: "100%", maxWidth: 900, marginVertical: 10 }}>
        <Text style={{ fontSize: 18 }}>Description</Text>
        <Text style={{ fontSize: 16 }}>{maintenanceLog.description}</Text>
      </View>

      <CardUI
        style={styles.cardStyle}
        titleShown={true}
        title="Maintenance data"
      >
        {maintenanceLog.maintenanceLogData.map((maintenanceLogData) => {
          return (
            <InfoItem
              key={maintenanceLogData.id}
              name={maintenanceLogData.name}
              value={maintenanceLogData.value}
            />
          );
        })}
      </CardUI>

      <View style={{ width: "100%", maxWidth: 900, alignItems: "flex-end" }}>
        <Text>maintenance done by:</Text>
        <Text>{user.name ? user.name : "Loading..."}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 5,
    width: "100%",
  },
});
