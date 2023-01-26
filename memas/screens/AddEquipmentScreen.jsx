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
import CardUI from "../components/uicomponents/CardUI";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TextInputUI from "../components/uicomponents/TextInputUI";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import GenericModalScreen from "./ModalScreens/GenericModalScreen";
import ListItemButton from "../components/uicomponents/ListItemButton";
import MemasCalendar from "../components/uicomponents/MemasCalendar/MemasCalendar";
import MiddleMan from "../database/MiddleMan";

export default function AddEquipmentScreen({ navigation }) {
  const [departments, setDepartments] = useState([{ id: 1 }, { id: 2 }]);
  const [equipment, setEquipment] = useState({
    name: "",
    assetTag: "",
    departmentId: 0,
    make: "",
    model: "",
    serialNumber: "",
    commissionDate: "Select Date",
    lastMaintenanceDate: "Select Date",
    nextMaintenanceDate: "Select Date",
    statusOptionId: 0,
    uploaded: 0,
    technicalSpecifications: [],
  });

  const [loading, setLoading] = useState(false);

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [calendarModalVisibility, setCalendarModalVisibility] = useState(false);
  const [departmentsModalVisibility, setDepartmentsModalVisibility] =
    useState(false);

  const tempTechnicalSpecification = useRef({
    name: "",
    value: "",
  });
  const [
    tempTechnicalSpecificationTextInputHintText,
    setTempTechnicalSpecificationTextInputHintText,
  ] = useState("Data");
  const tempTechnicalSpecificationTextInputRef = useRef(null);
  const [
    tempTechnicalSpecificationTextInputValue,
    setTempTechnicalSpecificationTextInputValue,
  ] = useState("");

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);
      setDepartmentsModalVisibility(false);
      setCalendarModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          return (
            <TopAppBarDefault
              title="Add equipment"
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
        }}
      />

      <GenericModalScreen
        visible={departmentsModalVisibility}
        onRequestClose={() => {
          setDepartmentsModalVisibility(false);
        }}
        actionButtonsComponent={() => <></>}
      >
        {departments.map((department) => {
          return (
            <ListItemButton
              key={department.id}
              text={"Department " + department.id}
              style={{ marginHorizontal: 5, marginVertical: 2 }}
              onPress={() => {
                setEquipment((oldState) => {
                  return {
                    ...oldState,
                    departmentId: department.id,
                  };
                });
                setDepartmentsModalVisibility(false);
              }}
            />
          );
        })}
      </GenericModalScreen>

      <GenericModalScreen
        visible={calendarModalVisibility}
        onRequestClose={() => {
          setCalendarModalVisibility(false);
        }}
        actionButtonsComponent={() => <></>}
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
              // 2022-11-03 16:02:53
              var formattedDate =
                "" +
                date.date.getFullYear() +
                "-" +
                (date.date.getMonth() < 9
                  ? "0" + (date.date.getMonth() + 1)
                  : date.date.getMonth() + 1) +
                "-" +
                (date.date.getDate() < 9
                  ? "0" + date.date.getDate()
                  : date.date.getDate()) +
                " 00:00:00";

              setEquipment((oldState) => {
                return { ...oldState, commissionDate: formattedDate };
              });

              setCalendarModalVisibility(false);
            }
          }}
        />
      </GenericModalScreen>

      <View style={{ width: "95%", maxWidth: 700 }}>
        <TextInputUI
          style={styles.textInputStyles}
          hint="Equipment name"
          onChangeText={(e) => {
            setEquipment((oldState) => {
              return {
                ...oldState,
                name: e,
              };
            });
          }}
        />
        <TextInputUI
          style={styles.textInputStyles}
          hint="Asset Tag"
          onChangeText={(e) => {
            setEquipment((oldState) => {
              return {
                ...oldState,
                assetTag: e,
              };
            });
          }}
        />

        <TouchableOpacity
          style={[
            styles.textInputStyles,
            {
              flexDirection: "row",
              padding: 12,
            },
          ]}
          onPress={() => {
            setDepartmentsModalVisibility(true);
          }}
        >
          <Text style={{ flex: 1, color: "#4CAF50", fontSize: 17 }}>
            Select Department:{" "}
            {equipment.departmentId == 0 ? "" : equipment.departmentId}
          </Text>
          <Icons name="arrow-dropdown" />
        </TouchableOpacity>

        <TextInputUI
          style={styles.textInputStyles}
          hint="Make"
          onChangeText={(e) => {
            setEquipment((oldState) => {
              return {
                ...oldState,
                make: e,
              };
            });
          }}
        />
        <TextInputUI
          style={styles.textInputStyles}
          hint="Model"
          onChangeText={(e) => {
            setEquipment((oldState) => {
              return {
                ...oldState,
                model: e,
              };
            });
          }}
        />
        <TextInputUI
          style={styles.textInputStyles}
          hint="Serial No."
          onChangeText={(e) => {
            setEquipment((oldState) => {
              return {
                ...oldState,
                serialNumber: e,
              };
            });
          }}
        />
        <TextInputUI
          style={styles.textInputStyles}
          hint="Commission Date"
          isButton={true}
          value={equipment.commissionDate}
          onPress={() => {
            setCalendarModalVisibility(true);
          }}
          onClearPress={() => {
            setEquipment((oldState) => {
              return {
                ...oldState,
                commissionDate: "Select Date",
              };
            });
          }}
        />

        <CardUI
          style={styles.textInputStyles}
          titleShown
          title={"Technical specification"}
        >
          {equipment.technicalSpecifications.map((technicalSpecification) => {
            return (
              <TouchableOpacity
                key={technicalSpecification.id}
                style={{ width: "100%" }}
              >
                <InfoItem
                  style={{ paddingVertical: 5, width: "100%" }}
                  name={technicalSpecification.name}
                  value={technicalSpecification.value}
                />
              </TouchableOpacity>
            );
          })}

          <TextInputUI
            style={{ backgroundColor: "#EDF7ED", marginTop: 10, width: "100%" }}
            hint={tempTechnicalSpecificationTextInputHintText}
            value={tempTechnicalSpecificationTextInputValue}
            textInputRef={tempTechnicalSpecificationTextInputRef}
            onChangeText={(e) => {
              var words = e.split(":");

              if (words.length > 0) {
                if (words.length > 1) {
                  tempTechnicalSpecification.current.value = words[1];
                } else {
                  tempTechnicalSpecification.current.name = words[0];
                  setTempTechnicalSpecificationTextInputHintText(words[0]);
                }
              }

              setTempTechnicalSpecificationTextInputValue(e);
            }}
          />

          <DefaultButton
            style={{ marginTop: 10 }}
            text={"Add Specification"}
            onPress={() => {
              setEquipment((oldState) => {
                return {
                  ...oldState,
                  technicalSpecifications: [
                    ...oldState.technicalSpecifications,
                    {
                      id: oldState.technicalSpecifications.length + 1,
                      name: tempTechnicalSpecification.current.name,
                      value: tempTechnicalSpecification.current.value,
                    },
                  ],
                };
              });

              tempTechnicalSpecificationTextInputRef.current
                ? tempTechnicalSpecificationTextInputRef.current.clear()
                : console.log("somthing is not right");

              tempTechnicalSpecification.current.name = "";
              tempTechnicalSpecification.current.value = "";
              setTempTechnicalSpecificationTextInputHintText("Data");
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
            MiddleMan.equipmentNew(equipment).then((result) => {
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
