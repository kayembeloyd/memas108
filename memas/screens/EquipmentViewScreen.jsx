import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import InfoItem from "../components/appcomponents/InfoItem";
import CardUI from "../components/uicomponents/CardUI";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";

export default function EquipmentViewScreen({ navigation }) {
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarDefault
              title={title}
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
        backgroundColor: "yellow",
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

      <CardUI style={styles.cardStyle} titleShown={true} title="General Info">
        <InfoItem name={"Name:"} value={"Oxygen Concentrator"} />
        <InfoItem name={"Department:"} value={"Maternity ward"} />
        <InfoItem name={"Make:"} value={"CANTA"} />
        <InfoItem name={"Model:"} value={"VN-WS-08"} />
        <InfoItem name={"Serial No.:"} value={"1299H39HD324"} />
      </CardUI>

      <CardUI style={styles.cardStyle}>
        <InfoItem name={"Last Maintenance Date:"} value={"06 Nov 2022"} />
        <InfoItem name={"Next Service:"} value={"28 Nov 2022"} />
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
          backgroundColor={"red"}
          onPress={() => {
            navigation.navigate("AddMaintenanceLogScreen");
          }}
        />
        <DefaultButton
          style={styles.buttonStyle}
          text={"Preventive Maintenance"}
          backgroundColor={"red"}
          onPress={() => {
            navigation.navigate("AddMaintenanceLogScreen");
          }}
        />
        <DefaultButton
          style={styles.buttonStyle}
          text={"Set next Service date"}
        />
        <DefaultButton style={styles.buttonStyle} text={"Equipment Status"} />
      </CardUI>

      <CardUI style={styles.cardStyle} titleShown={true} title="Other Info">
        <InfoItem name={"Supplied by:"} value={"Ministry of Health"} />
        <InfoItem name={"Commission date:"} value={"6 Nov 2022"} />
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
