import React from "react";
import { View, Button, Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AboutScreen from "../screens/AboutScreen";
import AddEquipmentScreen from "../screens/AddEquipmentScreen";
import AddMaintenanceLogScreen from "../screens/AddMaintenanceLogScreen";
import EquipmentScreen from "../screens/EquipmentScreen";
import EquipmentViewScreen from "../screens/EquipmentViewScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MaintenanceLogViewScreen from "../screens/MaintenanceLogViewScreen";
import MaintenanceLogsScreen from "../screens/MaintenanceLogsScreen";
import MaintenanceScheduleScreen from "../screens/MaintenanceScheduleScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ScanScreen from "../screens/ScanScreen";

const stackNavigator = createNativeStackNavigator();

import { getHeaderTitle } from "@react-navigation/elements";
import TopAppBarDefault from "../components/appcomponents/TopAppBar/TopAppBarDefault";
import TopAppBarMainCentered from "../components/appcomponents/TopAppBar/TopAppBarMainCentered";
import TopAppBarWithSearchbar from "../components/appcomponents/TopAppBar/TopAppBarWithSearchbar";

export default function MainNavigationStack({ navigation }) {
  return (
    <stackNavigator.Navigator
      screenOptions={{
        headerMode: "screen",
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <TopAppBarDefault
              title={title}
              back={back}
              navigation={navigation}
            />
          );
        },
      }}
    >
      <stackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <TopAppBarMainCentered
                title={title}
                back={back}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <stackNavigator.Screen name="AboutScreen" component={AboutScreen} />
      <stackNavigator.Screen
        name="AddEquipmentScreen"
        component={AddEquipmentScreen}
      />
      <stackNavigator.Screen
        name="AddMaintenanceLogScreen"
        component={AddMaintenanceLogScreen}
      />
      <stackNavigator.Screen
        name="EquipmentScreen"
        component={EquipmentScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <TopAppBarWithSearchbar
                title={title}
                back={back}
                navigation={navigation}
              />
            );
          },
        }}
      />
      <stackNavigator.Screen
        name="EquipmentViewScreen"
        component={EquipmentViewScreen}
      />
      <stackNavigator.Screen name="Login" component={LoginScreen} />
      <stackNavigator.Screen
        name="MaintenanceLogViewScreen"
        component={MaintenanceLogViewScreen}
      />
      <stackNavigator.Screen
        name="MaintenanceLogsScreen"
        component={MaintenanceLogsScreen}
      />
      <stackNavigator.Screen
        name="MaintenanceScheduleScreen"
        component={MaintenanceScheduleScreen}
      />
      <stackNavigator.Screen name="ProfileScreen" component={ProfileScreen} />
      <stackNavigator.Screen name="ScanScreen" component={ScanScreen} />
    </stackNavigator.Navigator>
  );
}
