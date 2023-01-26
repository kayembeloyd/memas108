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

  return (
    <View
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
            backgroundColor: "#4CAF50",
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
                color: "#fff",
              }}
            >
              Scan Equipment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
