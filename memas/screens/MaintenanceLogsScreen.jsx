import React, { useEffect, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import BigList from "react-native-big-list";
import FilterBar from "../components/appcomponents/FilterBar/FilterBar";
import FilterBarItem from "../components/appcomponents/FilterBar/FilterBarItem";
import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import TopAppBarWithSearchbar from "../components/appcomponents/TopAppBar/TopAppBarWithSearchbar";
import MaintenanceLogItem from "../components/appcomponents/MaintenanceLogItem";
import DateLine from "../components/uicomponents/DateLine";

export default function MaintenanceLogsScreen({ navigation }) {
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
    [{ id: 10 }, { id: 11 }, { id: 12 }],
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
    [{ id: 10 }, { id: 11 }, { id: 12 }],
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
    [{ id: 10 }, { id: 11 }, { id: 12 }],
    [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
    [{ id: 10 }, { id: 11 }, { id: 12 }],
  ]);

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const { height, width } = useWindowDimensions();
  const renderItem = ({ item, index }) => (
    <MaintenanceLogItem
      style={{}}
      onPress={() => {
        navigation.navigate("MaintenanceLogViewScreen");
      }}
    />
  );
  const renderHeader = () => (
    <FilterBar
      style={{
        flexDirection: "row",
        width: width,
        backgroundColor: "red",
      }}
    >
      <FilterBarItem title="Department" value="All" />
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

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarWithSearchbar
              title={"Search equipment"}
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
        sections={maintenanceLogs}
        stickySectionHeadersEnabled
        renderSectionHeader={(section) => <DateLine />}
        sectionHeaderHeight={50}
        renderItem={renderItem}
        itemHeight={150}
        placeholder={true}
        placeholderComponent={renderPlaceHolder}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backfaceVisibility: "rgba(0, 0, 0, 0)",
        }}
      >
        <ScanBottomSheet />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
