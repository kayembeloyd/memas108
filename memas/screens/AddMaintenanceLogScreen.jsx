import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icons from "../assets/icons/Icons";
import InfoItem from "../components/appcomponents/InfoItem";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import CardUI from "../components/uicomponents/CardUI";
import DateLine from "../components/uicomponents/DateLine";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TextInputUI from "../components/uicomponents/TextInputUI";
import MiddleMan from "../database/MiddleMan";

export default function AddMaintenanceLogScreen({ navigation, route }) {
  const { equipment, type } = route.params;

  const [loading, setLoading] = useState(false);
  const [maintenanceLog, setMaintenanceLog] = useState({
    equipmentId: equipment.id,
    date: "",
    doneByUserId: 0,
    type: type,
    description: "",
    uploaded: 0,
    maintenanceLogData: [],
  });

  const runOnce = useRef(true);

  const tempMaintenanceLogData = useRef({
    name: "",
    value: "",
  });
  const [
    tempMaintenanceLogDataTextInputHintText,
    setTempMaintenanceLogDataTextInputHintText,
  ] = useState("Data");
  const tempMaintenanceLogDataTextInputRef = useRef(null);
  const [
    tempMaintenanceLogDataTextInputValue,
    setTempMaintenanceLogDataTextInputValue,
  ] = useState("");

  useEffect(() => {
    return navigation.addListener("focus", () => {
      false;

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          return (
            <TopAppBarDefault
              title="Add Maintenance Log"
              back={back}
              navigation={navigation}
              profileOnPress={() => {}}
            />
          );
        },
      });

      if (runOnce) {
        MiddleMan.departmentGet(equipment.departmentId).then((department) => {
          setMaintenanceLog((oldState) => {
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
      <View style={{ width: "95%", maxWidth: 700 }}>
        <DateLine style={{ maxWidth: 900 }} />

        <View
          style={{
            width: "100%",
            maxWidth: 900,
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>
              {maintenanceLog.department
                ? maintenanceLog.department.name
                : "loading..."}
            </Text>
            <Text>{equipment.assetTag}</Text>
          </View>
          <Text style={[styles.item, { fontWeight: "700", fontSize: 18 }]}>
            {equipment.name}
          </Text>
          <Text style={styles.item}>Make: {equipment.make}</Text>
          <Text style={styles.item}>Model: {equipment.model}</Text>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 10,
            flexDirection: "row",
            padding: 12,
          }}
        >
          <Text style={{ flex: 1, fontSize: 18, color: "#4CAF50" }}>
            Maintenance Type:{" "}
            {type === "preventiveMaintenance"
              ? "Preventive Maintenance"
              : type === "correctiveMaintenance"
              ? "Corrective Maintenance"
              : "Not Set"}
          </Text>
          <Icons name="arrow-dropdown" />
        </TouchableOpacity>

        <TextInputUI
          style={styles.textInputStyles}
          hint="Maintenance description"
          onChangeText={(e) => {
            setMaintenanceLog((oldState) => {
              return {
                ...oldState,
                description: e,
              };
            });
          }}
        />

        <CardUI
          style={styles.textInputStyles}
          titleShown
          title={"Maintenance Data"}
        >
          {maintenanceLog.maintenanceLogData.map((maintenanceLogData) => {
            return (
              <TouchableOpacity
                key={maintenanceLogData.id}
                style={{ width: "100%" }}
              >
                <InfoItem
                  style={{ paddingVertical: 5, width: "100%" }}
                  name={maintenanceLogData.name}
                  value={maintenanceLogData.value}
                />
              </TouchableOpacity>
            );
          })}

          <TextInputUI
            style={{ backgroundColor: "#EDF7ED", marginTop: 10, width: "100%" }}
            hint={tempMaintenanceLogDataTextInputHintText}
            value={tempMaintenanceLogDataTextInputValue}
            textInputRef={tempMaintenanceLogDataTextInputRef}
            onChangeText={(e) => {
              var words = e.split(":");

              if (words.length > 0) {
                if (words.length > 1) {
                  tempMaintenanceLogData.current.value = words[1];
                } else {
                  tempMaintenanceLogData.current.name = words[0];
                  setTempMaintenanceLogDataTextInputHintText(words[0]);
                }
              }

              setTempMaintenanceLogDataTextInputValue(e);
            }}
          />
          <DefaultButton
            style={{ marginTop: 10 }}
            text={"Add Data"}
            onPress={() => {
              setMaintenanceLog((oldState) => {
                return {
                  ...oldState,
                  maintenanceLogData: [
                    ...oldState.maintenanceLogData,
                    {
                      id: oldState.maintenanceLogData.length + 1,
                      name: tempMaintenanceLogData.current.name,
                      value: tempMaintenanceLogData.current.value,
                    },
                  ],
                };
              });

              tempMaintenanceLogDataTextInputRef.current
                ? tempMaintenanceLogDataTextInputRef.current.clear()
                : console.log("somthing is not right");

              tempMaintenanceLogData.current.name = "";
              tempMaintenanceLogData.current.value = "";
              setTempMaintenanceLogDataTextInputHintText("Data");
            }}
          />
        </CardUI>
      </View>

      <DefaultButton
        style={{
          margin: 10,
          width: "60%",
          maxWidth: 700,
        }}
        text={loading ? "Loading..." : "SAVE"}
        onPress={() => {
          if (!loading) {
            MiddleMan.maintenanceLogNew(maintenanceLog).then((result) => {
              setLoading(false);
            });
            setLoading(true);
          }
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInputStyles: { backgroundColor: "#fff", marginTop: 10 },
});
