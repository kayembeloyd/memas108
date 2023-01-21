import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import InfoItem from "../components/appcomponents/InfoItem";
import CardUI from "../components/uicomponents/CardUI";
import DateLine from "../components/uicomponents/DateLine";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";

export default function MaintenanceLogViewScreen({ navigation }) {
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarDefault
              title={"Maintenance Log #1234"}
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
          navigation.navigate("AddEquipmentScreen");
        }}
      />

      <DateLine style={{ width: 800, maxWidth: 900 }} />

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

      <View style={{ width: "100%", maxWidth: 900, marginVertical: 15 }}>
        <Text style={{ fontSize: 18 }}>Maintenance Type:</Text>
        <Text style={{ fontSize: 16 }}>Preventive maintenance</Text>
      </View>

      <View style={{ width: "100%", maxWidth: 900, marginVertical: 10 }}>
        <Text style={{ fontSize: 18 }}>Description</Text>
        <Text style={{ fontSize: 16 }}>
          General PPM, Replaced Sieve beds, Replaced filters, Replaced
          Compressor gaskets
        </Text>
      </View>

      <CardUI
        style={styles.cardStyle}
        titleShown={true}
        title="Maintenance data"
      >
        <InfoItem name={"O2 Conc.:"} value={"93%"} />
        <InfoItem name={"Pressure:"} value={"7psi"} />
      </CardUI>

      <View style={{ width: "100%", maxWidth: 900, alignItems: "flex-end" }}>
        <Text>maintenance done by:</Text>
        <Text>Lloyd Kayembe</Text>
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
