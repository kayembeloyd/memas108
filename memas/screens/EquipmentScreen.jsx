import React, { useEffect, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import BigList from "react-native-big-list";
import EquipmentItem from "../components/appcomponents/EquipmentItem";
import FilterBar from "../components/appcomponents/FilterBar/FilterBar";
import FilterBarItem from "../components/appcomponents/FilterBar/FilterBarItem";
import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import TopAppBarWithSearchbar from "../components/appcomponents/TopAppBar/TopAppBarWithSearchbar";
import GenericModalScreen from "./ModalScreens/GenericModalScreen";
import ListItemButton from "../components/uicomponents/ListItemButton";

export default function EquipmentScreen({ navigation }) {
  const [equipment, setEquipment] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
    { id: 40 },
    { id: 41 },
    { id: 42 },
    { id: 43 },
    { id: 44 },
    { id: 45 },
    { id: 46 },
    { id: 47 },
    { id: 48 },
    { id: 49 },
    { id: 50 },
    { id: 51 },
    { id: 52 },
    { id: 53 },
    { id: 54 },
    { id: 55 },
    { id: 56 },
    { id: 57 },
    { id: 58 },
    { id: 59 },
    { id: 60 },
    { id: 61 },
    { id: 62 },
    { id: 63 },
  ]);
  const [departments, setDepartments] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
  ]);
  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [departmentsModalVisibility, setDepartmentsModalVisibility] =
    useState(false);

  const { height, width } = useWindowDimensions();

  const renderItem = ({ item, index }) => (
    <EquipmentItem
      style={{}}
      onPress={() => {
        navigation.navigate("EquipmentViewScreen");
      }}
    />
  );
  const renderHeader = () => (
    <FilterBar
      style={{
        flex: 1,
        flexDirection: "row",
        height: 50,
        width: width,
        backgroundColor: "red",
      }}
    >
      <FilterBarItem
        title="Department"
        value="All"
        onPress={() => setDepartmentsModalVisibility(true)}
      />
      <FilterBarItem title="Status" value="All" />
      <FilterBarItem title="Make" value="All" />
      <FilterBarItem title="Model" value="All" />
    </FilterBar>
  );
  const renderPlaceHolder = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);
      setDepartmentsModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarWithSearchbar
              title="Search equipment"
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
    <View
      style={{
        height: "100%",
        flex: 1,
      }}
    >
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
              onPress={() => setDepartmentsModalVisibility(false)}
            />
          );
        })}
      </GenericModalScreen>

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

      <BigList
        renderHeader={renderHeader}
        headerHeight={50}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        stickySectionHeadersEnabled
        data={equipment}
        renderItem={renderItem}
        placeholder={true}
        placeholderComponent={renderPlaceHolder}
        itemHeight={100}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <ScanBottomSheet />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
