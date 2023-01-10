import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigationStack from "./memas/navigation/MainNavigationStack";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigationStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
