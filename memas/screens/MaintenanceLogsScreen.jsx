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
import GenericModalScreen from "./ModalScreens/GenericModalScreen";
import ListItemButton from "../components/uicomponents/ListItemButton";

export default function MaintenanceLogsScreen({ navigation, route }) {
  const filterEquipment = useRef(route.params.filterEquipment);

  const currentPage = useRef(1);
  const canLoadMore = useRef(true);
  const isLoading = useRef(false);
  const maintenanceLogs = useRef([]);
  const maintenanceLogDateSections = useRef([]);
  const [sortedMaintenanceLogs, setSortedMaintenanceLogs] = useState([]);

  const filteringOptions = useRef({
    department: { id: 0, name: "All", uploaded: 0 },
    search: "",
    status: { id: 0, name: "All" },
    make: "All",
    model: "All",
    equipment: filterEquipment.current,
  });

  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedModel, setSelectedModel] = useState("All");

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [departmentsModalVisibility, setDepartmentsModalVisibility] =
    useState(false);
  const [statusModalVisibility, setStatusModalVisibility] = useState(false);

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
        value={selectedDepartment}
        onPress={() => setDepartmentsModalVisibility(true)}
      />
      <FilterBarItem
        title="Status"
        value={selectedStatus}
        onPress={() => setStatusModalVisibility(true)}
      />
      <FilterBarItem title="Make" value="All" />
      <FilterBarItem title="Model" value="All" />
    </FilterBar>
  );
  const renderPlaceHolder = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  const refreshMaintenanceLogs = () => {
    currentPage.current = 1;
    canLoadMore.current = true;
    isLoading.current = false;

    maintenanceLogs.current = [];
    maintenanceLogDateSections.current = [];
    setSortedMaintenanceLogs([]);

    loadMore();
  };

  const loadDepartments = () => {
    MiddleMan.departments().then((depts) => {
      setDepartments((oldState) => {
        return [{ id: 0, name: "All", uploaded: 0 }, , ...depts];
      });
    });
  };

  const loadStatuses = () => {
    MiddleMan.statuses().then((stss) => {
      setStatuses((oldState) => {
        return [{ id: 0, name: "All", uploaded: 0 }, , ...stss];
      });
    });
  };

  const loadMore = () => {
    if (!isLoading.current) {
      if (canLoadMore.current) {
        MiddleMan.maintenanceLogs(
          currentPage.current,
          4,
          filteringOptions.current
        ).then((newMaintenanceLogs) => {
          isLoading.current = false;
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
        });
      }
    }
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);
      setDepartmentsModalVisibility(false);
      setStatusModalVisibility(false);

      navigation.setOptions({
        header: ({ navigation, route, options, back }) => {
          return (
            <TopAppBarWithSearchbar
              title={
                filterEquipment.current.id != 0
                  ? filterEquipment.current.name +
                    "(" +
                    filterEquipment.current.assetTag +
                    ")"
                  : "Search equipment"
              }
              back={back}
              navigation={navigation}
              profileOnPress={() => {
                setProfileModalVisibility(true);
              }}
              onSubmitEditing={(e) => {
                filteringOptions.current.search = e.nativeEvent.text;
                filteringOptions.current.equipment = { id: 0 };
                // Load equipment
                refreshMaintenanceLogs();
              }}
            />
          );
        },
      });

      loadStatuses();

      loadDepartments();

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

      <GenericModalScreen
        visible={statusModalVisibility}
        onRequestClose={() => {
          setStatusModalVisibility(false);
        }}
        actionButtonsComponent={() => <></>}
      >
        {statuses.map((status) => {
          return (
            <ListItemButton
              key={status.id}
              text={status.name}
              style={{ marginHorizontal: 5, marginVertical: 2 }}
              onPress={() => {
                setSelectedStatus(status.name);
                filteringOptions.current.status = status;
                filteringOptions.current.equipment = { id: 0 };
                setStatusModalVisibility(false);

                // Load equipment
                refreshMaintenanceLogs();
              }}
            />
          );
        })}
      </GenericModalScreen>

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
              text={department.name}
              style={{ marginHorizontal: 5, marginVertical: 2 }}
              onPress={() => {
                setSelectedDepartment(department.name);
                filteringOptions.current.department = department;
                filteringOptions.current.equipment = { id: 0 };
                setDepartmentsModalVisibility(false);

                // Load equipment
                refreshMaintenanceLogs();
              }}
            />
          );
        })}
      </GenericModalScreen>

      <BigList
        style={{ marginBottom: 42 }}
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
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          loadMore();
        }}
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
