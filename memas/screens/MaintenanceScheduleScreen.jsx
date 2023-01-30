import React, { useEffect, useRef, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import BigList from "react-native-big-list";
import FilterBar from "../components/appcomponents/FilterBar/FilterBar";
import FilterBarItem from "../components/appcomponents/FilterBar/FilterBarItem";
import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import TopAppBarWithSearchbar from "../components/appcomponents/TopAppBar/TopAppBarWithSearchbar";
import MaintenanceScheduleItem from "../components/appcomponents/MaintenanceScheduleItem";
import MiddleMan from "../database/MiddleMan";
import Helper from "../components/uicomponents/MemasCalendar/helpers/Helper";

export default function MaintenanceScheduleScreen({ navigation }) {
  const maintenanceSchedulesPage = useRef(1);
  const canLoadMore = useRef(true);
  const maintenanceSchedules = useRef([]);
  const maintenanceScheduleDateSections = useRef([]);
  const [sortedMaintenanceSchedules, setSortedMaintenanceSchedules] = useState(
    []
  );

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const { height, width } = useWindowDimensions();

  const getFormattedDate2 = (date) => {
    return (
      "" +
      date.getFullYear() +
      "-" +
      (date.getMonth() < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate())
    );
  };

  const renderItem = ({ item, index }) => (
    <MaintenanceScheduleItem
      style={{}}
      onPress={() => {
        navigation.navigate("AddMaintenanceLogScreen", {
          equipment: item,
          type: "preventiveMaintenance",
        });
      }}
      equipment={item}
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

      if (canLoadMore.current) {
        MiddleMan.maintenanceSchedule(
          maintenanceSchedulesPage.current,
          10,
          getFormattedDate2(new Date())
        ).then((newMaintenanceSchedules) => {
          canLoadMore.current = newMaintenanceSchedules.length > 0;

          var sorted = [];
          var toSort = [
            ...maintenanceSchedules.current,
            ...newMaintenanceSchedules,
          ];

          for (const ms of toSort) {
            !maintenanceScheduleDateSections.current.find(
              (o) => o.date == ms.nextMaintenanceDate
            )
              ? maintenanceScheduleDateSections.current.push({
                  index: maintenanceScheduleDateSections.current.length,
                  date: ms.nextMaintenanceDate,
                })
              : null;
          }

          for (const msds of maintenanceScheduleDateSections.current)
            sorted.push([]);

          for (const ms of toSort) {
            const msds = maintenanceScheduleDateSections.current.find(
              (o) => o.date == ms.nextMaintenanceDate
            );
            msds ? sorted[msds.index].push(ms) : null;
          }

          maintenanceSchedules.current = [
            ...maintenanceSchedules.current,
            ...newMaintenanceSchedules,
          ];

          maintenanceSchedulesPage.current += 1;

          setSortedMaintenanceSchedules(sorted);
        });
      }
    });
  }, [navigation]);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#fff",
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
        style={{ marginBottom: 42 }}
        renderHeader={renderHeader}
        headerHeight={50}
        sections={sortedMaintenanceSchedules}
        stickySectionHeadersEnabled
        renderSectionHeader={(section) => (
          <View
            style={{
              height: 70,
              backgroundColor: "#fff",
              width: 50,
            }}
          >
            <View
              style={{ height: 1, backgroundColor: "#CBCBCB", width: width }}
            ></View>
            <View style={{ marginTop: 8, marginLeft: 8 }}>
              <Text style={{ fontWeight: "700" }}>
                {maintenanceScheduleDateSections.current.length > section
                  ? new Date(
                      maintenanceScheduleDateSections.current[section].date
                    ).getDate()
                  : "loading..."}
              </Text>
              <Text style={{ fontWeight: "700" }}>
                {maintenanceScheduleDateSections.current.length > section
                  ? Helper.monthShortNameFromNumber(
                      new Date(
                        maintenanceScheduleDateSections.current[section].date
                      ).getMonth()
                    )
                  : "loading..."}
              </Text>
              <Text style={{ fontWeight: "700" }}>
                {maintenanceScheduleDateSections.current.length > section
                  ? new Date(
                      maintenanceScheduleDateSections.current[section].date
                    ).getFullYear()
                  : "loading..."}
              </Text>
            </View>
          </View>
        )}
        renderItem={renderItem}
        itemHeight={73}
        placeholder={true}
        placeholderComponent={renderPlaceHolder}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <ScanBottomSheet navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
