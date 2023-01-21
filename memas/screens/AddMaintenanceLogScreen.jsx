import React, { useEffect } from "react";
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

export default function AddMaintenanceLogScreen({ navigation }) {
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
          style={{
            marginTop: 10,
            flexDirection: "row",
            padding: 12,
          }}
        >
          <Text style={{ flex: 1, fontSize: 18, color: "#4CAF50" }}>
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
            style={{ backgroundColor: "#EDF7ED", marginTop: 10, width: "100%" }}
            hint="Data"
          />
          <DefaultButton style={{ marginTop: 10 }} text={"Add Data"} />
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
