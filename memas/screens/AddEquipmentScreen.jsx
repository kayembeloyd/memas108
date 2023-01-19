import React from "react";
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

export default function AddEquipmentScreen() {
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
      <View style={{ width: "95%", maxWidth: 700 }}>
        <TextInputUI style={styles.textInputStyles} hint="Equipment name" />
        <TextInputUI style={styles.textInputStyles} hint="Asset Tag" />

        <TouchableOpacity
          style={[
            styles.textInputStyles,
            {
              flexDirection: "row",
              backgroundColor: "red",
              padding: 12,
            },
          ]}
        >
          <Text style={{ flex: 1 }}>Select Department</Text>
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
            style={[styles.textInputStyles, { width: "100%" }]}
            hint="Data"
          />

          <DefaultButton
            style={styles.textInputStyles}
            text={"Add Specification"}
          />
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
  textInputStyles: { backgroundColor: "blue", marginTop: 10 },
});
