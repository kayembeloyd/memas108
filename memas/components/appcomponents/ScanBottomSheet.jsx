import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Easing,
  View,
  Platform,
} from "react-native";
import Icons from "../../assets/icons/Icons";

export default function ScanBottomSheet() {
  const [isSheetVisible, setSheetVisibility] = useState(false);

  const { height } = useWindowDimensions();
  const sheetAnim = useRef(new Animated.Value(42)).current;

  const openSheet = () => {
    Animated.timing(sheetAnim, {
      toValue:
        height -
        ((Platform.OS === "android") | (Platform.OS === "ios") ? 50 + 24 : 50),
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 42,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={{
        width: "95%",
        maxWidth: 700,
        backgroundColor: "indigo",
        height: sheetAnim,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View style={{}}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 42,
          }}
          onPress={() => {
            isSheetVisible ? closeSheet() : openSheet();
            setSheetVisibility(!isSheetVisible);
          }}
        >
          <View>
            <Icons name="drag-handle" />
            <Text
              style={{
                marginTop: 5,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Scan Equipment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
