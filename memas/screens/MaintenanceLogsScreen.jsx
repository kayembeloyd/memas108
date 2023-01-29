import React, { useEffect, useRef, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet, View } from "react-native";

import BigList from "react-native-big-list";
import FilterBar from "../components/appcomponents/FilterBar/FilterBar";
import FilterBarItem from "../components/appcomponents/FilterBar/FilterBarItem";
import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import TopAppBarWithSearchbar from "../components/appcomponents/TopAppBar/TopAppBarWithSearchbar";
import MaintenanceLogItem from "../components/appcomponents/MaintenanceLogItem";
import DateLine from "../components/uicomponents/DateLine";
import MiddleMan from "../database/MiddleMan";

export default function MaintenanceLogsScreen({ navigation }) {
  const currentPage = useRef(1);
  const canLoadMore = useRef(true);
  const maintenanceLogs = useRef([]);
  const maintenanceLogDateSections = useRef([]);
  const [sortedMaintenanceLogs, setSortedMaintenanceLogs] = useState([]);

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const { height, width } = useWindowDimensions();

  const renderItem = ({ item, index }) => (
    <MaintenanceLogItem
      style={{}}
      maintenanceLog={item}
      onPress={() => {
        navigation.navigate("MaintenanceLogViewScreen", { item });
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
      <FilterBarItem
        title="Department"
        value="All"
        onPress={() => {
          loadMore();
        }}
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
  const loadMore = () => {
    if (canLoadMore.current) {
      MiddleMan.maintenanceLogs(currentPage.current, 4).then(
        (newMaintenanceLogs) => {
          canLoadMore.current = newMaintenanceLogs.length > 0;

          var sorted = [];
          var toSort = [...maintenanceLogs.current, ...newMaintenanceLogs];

          for (const ml of toSort) {
            !maintenanceLogDateSections.current.find((o) => o.date == ml.date)
              ? maintenanceLogDateSections.current.push({
                  index: maintenanceLogDateSections.current.length,
                  date: ml.date,
                })
              : null;
          }

          for (const mlds of maintenanceLogDateSections.current)
            sorted.push([]);

          for (const ml of toSort) {
            const mlds = maintenanceLogDateSections.current.find(
              (o) => o.date == ml.date
            );
            mlds ? sorted[mlds.index].push(ml) : null;
          }

          maintenanceLogs.current = [
            ...maintenanceLogs.current,
            ...newMaintenanceLogs,
          ];

          currentPage.current += 1;

          setSortedMaintenanceLogs(sorted);
        }
      );
    }
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
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

      loadMore();
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
        sections={sortedMaintenanceLogs}
        stickySectionHeadersEnabled
        renderSectionHeader={(section) => (
          <DateLine
            dateText={maintenanceLogDateSections.current[section].date}
          />
        )}
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
