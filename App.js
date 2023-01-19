import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import MainNavigationStack from "./memas/navigation/MainNavigationStack";
import { useCallback } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./memas/assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        fontFamily: "Roboto-Regular",
        backgroundColor: "white",
      }}
      onLayout={onLayoutRootView}
    >
      <StatusBar backgroundColor="#388E3C" />

      <NavigationContainer>
        <MainNavigationStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
