import React, { useEffect, useRef, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet, View } from "react-native";

import BigList from "react-native-big-list";
import EquipmentItem from "../components/appcomponents/EquipmentItem";
import FilterBar from "../components/appcomponents/FilterBar/FilterBar";
import FilterBarItem from "../components/appcomponents/FilterBar/FilterBarItem";
import ScanBottomSheet from "../components/appcomponents/ScanBottomSheet";
import ProfileModalScreen from "./ModalScreens/ProfileModalScreen";
import TopAppBarWithSearchbar from "../components/appcomponents/TopAppBar/TopAppBarWithSearchbar";
import GenericModalScreen from "./ModalScreens/GenericModalScreen";
import ListItemButton from "../components/uicomponents/ListItemButton";
import MiddleMan from "../database/MiddleMan";

export default function EquipmentScreen({ navigation, route }) {
  const equipmentPage = useRef(1);
  const canLoadMore = useRef(true);
  const isLoading = useRef(false);
  const [equipment, setEquipment] = useState([]);

  const filteringOptions = useRef({
    department: { id: 0, name: "All", uploaded: 0 },
    search: "",
    status: { id: 0, name: "All" },
    make: "All",
    model: "All",
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

  // Functions for the BigList
  const renderItem = ({ item, index }) => (
    <EquipmentItem
      style={{}}
      onPress={() => {
        navigation.navigate("EquipmentViewScreen", {
          equipment: item,
          updateParent: updatedEquipment,
        });
      }}
      equipment={item}
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
        value={selectedDepartment}
        onPress={() => setDepartmentsModalVisibility(true)}
      />
      <FilterBarItem
        title="Status"
        value={selectedStatus}
        onPress={() => setStatusModalVisibility(true)}
      />
      <FilterBarItem title="Make" value={selectedMake} />
      <FilterBarItem title="Model" value={selectedModel} />
    </FilterBar>
  );
  const renderPlaceHolder = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );

  const updatedEquipment = (o) => {
    // Find it
    const i = equipment.findIndex((p) => p.id == o.id);
    i != -1
      ? setEquipment((oldState) => {
          const newState = [...oldState];
          newState[i] = o;
          return newState;
        })
      : null;
  };

  const refreshEquipment = () => {
    equipmentPage.current = 1;
    canLoadMore.current = true;
    isLoading.current = false;

    setEquipment([]);
    loadMore();
  };

  const loadMore = () => {
    if (!isLoading.current) {
      if (canLoadMore.current) {
        isLoading.current = true;

        MiddleMan.equipment(
          equipmentPage.current,
          10,
          filteringOptions.current
        ).then((equipment) => {
          isLoading.current = false;
          canLoadMore.current = equipment.length > 0;

          setEquipment((oldState) => {
            const newState = [...oldState];
            for (const e of equipment) {
              newState.push(e);
            }

            equipmentPage.current += 1;
            return newState;
          });
        });
      }
    }
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
        return [{ id: 0, name: "All", uploaded: 0 }, ...stss];
      });
    });
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
              title="Search equipment"
              back={back}
              navigation={navigation}
              profileOnPress={() => {
                setProfileModalVisibility(true);
              }}
              onSubmitEditing={(e) => {
                filteringOptions.current.search = e.nativeEvent.text;

                // Load equipment
                refreshEquipment();
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
                setStatusModalVisibility(false);

                // Load equipment
                refreshEquipment();
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
                setDepartmentsModalVisibility(false);

                // Load equipment
                refreshEquipment();
              }}
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
        style={{ marginBottom: 42 }}
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
