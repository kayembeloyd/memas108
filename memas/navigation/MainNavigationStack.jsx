import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AboutScreen from "../screens/AboutScreen";
import AddEquipmentScreen from "../screens/AddEquipmentScreen";
import AddMaintenanceLogScreen from "../screens/AddEquipmentScreen";
import EquipmentScreen from "../screens/AddEquipmentScreen";
import EquipmentViewScreen from "../screens/AddEquipmentScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MaintenanceLogViewScreen from "../screens/MaintenanceLogViewScreen";
import MaintenanceLogsScreen from "../screens/MaintenanceLogsScreen";
import MaintenanceScheduleScreen from "../screens/MaintenanceScheduleScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ScanScreen from "../screens/ScanScreen";

const stackNavigator = createNativeStackNavigator();

export default function MainNavigationStack({ navigation }) {
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen name="Home" component={HomeScreen} />
      <stackNavigator.Screen name="About" component={AboutScreen} />
      <stackNavigator.Screen
        name="Add Equipment"
        component={AddEquipmentScreen}
      />
      <stackNavigator.Screen
        name="Add Maintenance Log"
        component={AddMaintenanceLogScreen}
      />
      <stackNavigator.Screen name="Equipment" component={EquipmentScreen} />
      <stackNavigator.Screen
        name="Equipment View"
        component={EquipmentViewScreen}
      />
      <stackNavigator.Screen name="Login" component={LoginScreen} />
      <stackNavigator.Screen
        name="Maintenance Log View"
        component={MaintenanceLogViewScreen}
      />
      <stackNavigator.Screen
        name="Maintenance Logs"
        component={MaintenanceLogsScreen}
      />
      <stackNavigator.Screen
        name="Maintenance Schedule"
        component={MaintenanceScheduleScreen}
      />
      <stackNavigator.Screen name="Profile" component={ProfileScreen} />
      <stackNavigator.Screen name="Scan" component={ScanScreen} />
    </stackNavigator.Navigator>
  );
}
