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
  const [equipment, setEquipment] = useState([]);

  const [departments, setDepartments] = useState([{ id: 1 }, { id: 2 }]);

  const [profileModalVisibility, setProfileModalVisibility] = useState(false);
  const [departmentsModalVisibility, setDepartmentsModalVisibility] =
    useState(false);

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

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setProfileModalVisibility(false);
      setDepartmentsModalVisibility(false);

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
            />
          );
        },
      });

      if (canLoadMore.current) {
        MiddleMan.equipment(equipmentPage.current, 10).then((equipment) => {
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
