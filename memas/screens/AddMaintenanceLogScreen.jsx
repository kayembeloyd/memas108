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
import DateLine from "../components/uicomponents/DateLine";
import DefaultButton from "../components/uicomponents/DefaultButton";
import TextInputUI from "../components/uicomponents/TextInputUI";

export default function AddMaintenanceLogScreen() {
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
        <DateLine style={{ maxWidth: 900 }} />

        <View
          style={{
            width: "100%",
            maxWidth: 900,
            backgroundColor: "green",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Department: Maternity</Text>
            <Text>MMJ001</Text>
          </View>
          <Text style={[styles.item, { fontWeight: "700", fontSize: 18 }]}>
            Oxygen Concentrator
          </Text>
          <Text style={styles.item}>Make: Canta</Text>
          <Text style={styles.item}>Model: VN-WS-08</Text>
        </View>

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
          <Text style={{ flex: 1 }}>
            Maintenance Type: Preventive maintenance
          </Text>
          <Icons name="arrow-dropdown" />
        </TouchableOpacity>

        <TextInputUI
          style={styles.textInputStyles}
          hint="Maintenance description"
        />

        <CardUI
          style={styles.textInputStyles}
          titleShown
          title={"Maintenance Data"}
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

          <DefaultButton style={styles.textInputStyles} text={"Add Data"} />
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
