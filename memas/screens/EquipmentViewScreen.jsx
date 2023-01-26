import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import InfoItem from "../components/appcomponents/InfoItem";
import CardUI from "../components/uicomponents/CardUI";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import GenericModalScreen from "./ModalScreens/GenericModalScreen";
import MemasCalendar from "../components/uicomponents/MemasCalendar/MemasCalendar";
import MiddleMan from "../database/MiddleMan";

export default function EquipmentViewScreen({ navigation, route }) {
  const { item } = route.params;

  const [equipment, setEquipment] = useState(item);
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [statusModalVisibility, setStatusModalVisibility] = useState(false);
  const [calendarModalVisibility, setCalendarModalVisibility] = useState(false);

  const runOnce = useRef(true);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);
      setStatusModalVisibility(false);
      setCalendarModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarDefault
              title={equipment.name}
              back={back}
              navigation={navigation}
              profileOnPress={() => {
                setProfileModalVisibility(true);
              }}
            />
          );
        },
      });

      if (runOnce) {
        MiddleMan.departmentGet(equipment.departmentId).then((department) => {
          setEquipment((oldState) => {
            return {
              ...oldState,
              department: department,
            };
          });
        });

        runOnce.current = false;
      }
    });
  }, [navigation]);

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "100%",
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

      <GenericModalScreen
        visible={statusModalVisibility}
        onRequestClose={() => {
          setStatusModalVisibility(false);
        }}
        actionButtonsComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <DefaultButton
              style={{ marginRight: 10, marginBottom: 10 }}
              text="Cancel"
              onPress={() => {
                setStatusModalVisibility(false);
              }}
            />
            <DefaultButton
              style={{ marginRight: 10, marginBottom: 10 }}
              text="Save"
              onPress={() => {
                setStatusModalVisibility(false);
              }}
            />
          </View>
        )}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Click to change status
        </Text>
        <TouchableOpacity>
          <View
            style={{
              margin: 10,
              paddingVertical: 15,
              backgroundColor: "#D9D9D9",
              borderRadius: 5,
            }}
          >
            <Text
              style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: "400" }}
            >
              Working
            </Text>
          </View>
        </TouchableOpacity>
      </GenericModalScreen>

      <GenericModalScreen
        visible={calendarModalVisibility}
        onRequestClose={() => {
          setCalendarModalVisibility(false);
        }}
        actionButtonsComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <DefaultButton
              style={{ marginRight: 10, marginBottom: 10 }}
              text="Cancel"
              onPress={() => {
                setCalendarModalVisibility(false);
              }}
            />
            <DefaultButton
              style={{ marginRight: 10, marginBottom: 10 }}
              text="Save"
              onPress={() => {
                setCalendarModalVisibility(false);
              }}
            />
          </View>
        )}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          Select date
        </Text>
        <MemasCalendar style={{ width: "100%", height: 500 }} />
      </GenericModalScreen>

      <CardUI style={styles.cardStyle} titleShown={true} title="General Info">
        <InfoItem name={"Name:"} value={equipment.name} />
        <InfoItem
          name={"Department:"}
          value={
            equipment.department ? equipment.department.name : "loading..."
          }
        />
        <InfoItem name={"Make:"} value={equipment.make} />
        <InfoItem name={"Model:"} value={equipment.model} />
        <InfoItem name={"Serial No.:"} value={equipment.serialNumber} />
      </CardUI>

      <CardUI style={styles.cardStyle}>
        <InfoItem
          name={"Last Maintenance Date:"}
          value={
            equipment.lastMaintenanceDate === "0000-00-00"
              ? "Not Set"
              : equipment.lastMaintenanceDate
          }
        />
        <InfoItem
          name={"Next Service:"}
          value={
            equipment.nextMaintenanceDate === "0000-00-00"
              ? "Not Set"
              : equipment.nextMaintenanceDate
          }
        />
        <InfoItem
          name={"Equipment Status:"}
          value={
            equipment.statusOptionId == 0 ? "Not Set" : equipment.statusOptionId
          }
        />
      </CardUI>

      <CardUI style={[styles.cardStyle]} center>
        <DefaultButton
          style={styles.buttonStyle}
          text={"Maintenance Logs"}
          onPress={() => {
            navigation.navigate("MaintenanceLogsScreen");
          }}
        />
        <DefaultButton
          style={styles.buttonStyle}
          text={"Corrective Maintenance"}
          backgroundColor={"#CE4949"}
          color="#fff"
          onPress={() => {
            const type = "correctiveMaintenance";
            navigation.navigate("AddMaintenanceLogScreen", { equipment, type });
          }}
        />
        <DefaultButton
          style={styles.buttonStyle}
          text={"Preventive Maintenance"}
          backgroundColor={"#CE4949"}
          color="#fff"
          onPress={() => {
            const type = "preventiveMaintenance";
            navigation.navigate("AddMaintenanceLogScreen", { equipment, type });
          }}
        />
        <DefaultButton
          style={styles.buttonStyle}
          text={"Set next Service date"}
          onPress={() => {
            setCalendarModalVisibility(true);
          }}
        />
        <DefaultButton
          style={styles.buttonStyle}
          text={"Equipment Status"}
          onPress={() => {
            setStatusModalVisibility(true);
          }}
        />
      </CardUI>

      <CardUI style={styles.cardStyle} titleShown={true} title="Other Info">
        <InfoItem name={"Supplied by:"} value={"Ministry of Health"} />
        <InfoItem
          name={"Commission date:"}
          value={
            equipment.commissionDate === "0000-00-00"
              ? "Not Set"
              : equipment.commissionDate
          }
        />
      </CardUI>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "600",
  },
  item: {
    marginBottom: 5,
  },
  cardStyle: {
    marginVertical: 5,
    width: "100%",
  },
  buttonStyle: {
    marginVertical: 4,
  },
});
