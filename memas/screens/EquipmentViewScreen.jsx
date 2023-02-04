import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import InfoItem from "../components/appcomponents/InfoItem";
import CardUI from "../components/uicomponents/CardUI";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import GenericModalScreen from "./ModalScreens/GenericModalScreen";
import MemasCalendar from "../components/uicomponents/MemasCalendar/MemasCalendar";
import MiddleMan from "../database/MiddleMan";

export default function EquipmentViewScreen({ navigation, route }) {
  const [equipment, setEquipment] = useState({ ...route.params.equipment });
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [statusModalVisibility, setStatusModalVisibility] = useState(false);
  const [calendarModalVisibility, setCalendarModalVisibility] = useState(false);

  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);

  const tEquipment = useRef({ ...equipment });
  const runOnce = useRef(true);

  const loadStatuses = () => {
    MiddleMan.statuses().then((stss) => {
      setStatuses((oldState) => {
        return [...stss];
      });
    });
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);
      setStatusModalVisibility(false);
      setCalendarModalVisibility(false);

      setEquipment((oldState) => {
        return { ...oldState, equipmentStatusText: "Not Set" };
      });

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          return (
            <TopAppBarDefault
              title={equipment.name}
              back={null}
              backPress={() => {
                route.params.updateParent(tEquipment.current);
                navigation.goBack();
              }}
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

          tEquipment.current = {
            ...tEquipment.current,
            department: department,
          };
        });

        equipment.statusOptionId != 0
          ? MiddleMan.statusesGet(equipment.statusOptionId).then((status) => {
              setEquipment((oldState) => {
                return { ...oldState, equipmentStatusText: status.name };
              });
            })
          : null;

        runOnce.current = false;
      }

      loadStatuses();
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
                // Save equipment
                setEquipment((oldState) => {
                  const updateEquipment = {
                    ...oldState,
                    statusOptionId: selectedStatus + 1,
                  };

                  tEquipment.current = {
                    ...tEquipment.current,
                    statusOptionId: selectedStatus + 1,
                  };

                  MiddleMan.equipmentUpdate(updateEquipment).then(
                    (response) => null
                  );

                  return updateEquipment;
                });

                MiddleMan.statusesGet(selectedStatus + 1).then((status) => {
                  setEquipment((oldState) => {
                    return { ...oldState, equipmentStatusText: status.name };
                  });
                });

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
        <TouchableOpacity
          onPress={() => {
            setSelectedStatus((oldState) => {
              if (oldState + 1 >= statuses.length) return 0;

              return oldState + 1;
            });
          }}
        >
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
              {statuses.length > 0
                ? statuses[selectedStatus].name
                : "loading..."}
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
        <MemasCalendar
          style={{ width: "100%", height: 500 }}
          onDateSelected={(date) => {
            if (date.date) {
              setEquipment((oldState) => {
                const updateEquipment = {
                  ...oldState,
                  nextMaintenanceDate:
                    "" +
                    date.date.getFullYear() +
                    "-" +
                    (date.date.getMonth() < 9
                      ? "0" + (date.date.getMonth() + 1)
                      : date.date.getMonth() + 1) +
                    "-" +
                    (date.date.getDate() < 9
                      ? "0" + date.date.getDate()
                      : date.date.getDate()),
                };

                tEquipment.current = {
                  ...tEquipment.current,
                  nextMaintenanceDate:
                    "" +
                    date.date.getFullYear() +
                    "-" +
                    (date.date.getMonth() < 9
                      ? "0" + (date.date.getMonth() + 1)
                      : date.date.getMonth() + 1) +
                    "-" +
                    (date.date.getDate() < 9
                      ? "0" + date.date.getDate()
                      : date.date.getDate()),
                };

                MiddleMan.equipmentUpdate(updateEquipment).then(
                  (response) => null
                );

                return updateEquipment;
              });

              setCalendarModalVisibility(false);
            }
          }}
        />
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
            equipment.statusOptionId == 0
              ? "Not Set"
              : equipment.equipmentStatusText
          }
        />
      </CardUI>

      <CardUI style={[styles.cardStyle]} center>
        <DefaultButton
          style={styles.buttonStyle}
          text={"Maintenance Logs"}
          onPress={() => {
            navigation.navigate("MaintenanceLogsScreen", {
              filterEquipment: equipment,
            });
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
