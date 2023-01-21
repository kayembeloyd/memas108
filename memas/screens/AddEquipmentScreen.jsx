import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import Icons from "../assets/icons/Icons";
import InfoItem from "../components/appcomponents/InfoItem";
import CardUI from "../components/uicomponents/CardUI";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TextInputUI from "../components/uicomponents/TextInputUI";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";

export default function AddEquipmentScreen({ navigation }) {
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
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

      <View style={{ width: "95%", maxWidth: 700 }}>
        <TextInputUI style={styles.textInputStyles} hint="Equipment name" />
        <TextInputUI style={styles.textInputStyles} hint="Asset Tag" />

        <TouchableOpacity
          style={[
            styles.textInputStyles,
            {
              flexDirection: "row",
              padding: 12,
            },
          ]}
        >
          <Text style={{ flex: 1, color: "#4CAF50", fontSize: 17 }}>
            Select Department
          </Text>
          <Icons name="arrow-dropdown" />
        </TouchableOpacity>

        <TextInputUI style={styles.textInputStyles} hint="Make" />
        <TextInputUI style={styles.textInputStyles} hint="Model" />
        <TextInputUI style={styles.textInputStyles} hint="Serial No." />
        <TextInputUI
          style={styles.textInputStyles}
          hint="Commission Date"
          isButton={true}
        />

        <CardUI
          style={styles.textInputStyles}
          titleShown
          title={"Technical Specifications"}
        >
          <TouchableOpacity style={{ width: "100%" }}>
            <InfoItem
              style={{ paddingVertical: 5, width: "100%" }}
              name={"O2 Conc: "}
              value={"93%"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ width: "100%" }}>
            <InfoItem
              style={{ paddingVertical: 5, width: "100%" }}
              name={"Pressure: "}
              value={"7psi"}
            />
          </TouchableOpacity>

          <TextInputUI
            style={{ backgroundColor: "#EDF7ED", marginTop: 10, width: "100%" }}
            hint="Data"
          />

          <DefaultButton style={{ marginTop: 10 }} text={"Add Specification"} />
        </CardUI>
      </View>

      <DefaultButton
        style={{
          margin: 10,
          width: "60%",
          maxWidth: 700,
        }}
        text={"SAVE"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInputStyles: { backgroundColor: "#fff", marginTop: 10 },
});
