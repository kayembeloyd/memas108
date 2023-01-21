import React from "react";
import { ScrollView, Text, useWindowDimensions } from "react-native";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "../../assets/icons/Icons";

export default function GenericModalScreen({
  visible,
  children,
  actionButtonsComponent,
  onRequestClose,
}) {
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          alignItems: "center",
        }}
        onPress={onRequestClose}
      >
        <Pressable
          style={{
            position: "absolute",
            top: 56,
            width: "100%",
            maxWidth: 700,
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowRadius: 5,
              paddingVertical: 20,
              maxHeight: height - 56 - 56,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: 48,
                backgroundColor: "#F9F9F9",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: "100%",
                  width: 48,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={onRequestClose}
              >
                <Icons name="close" />
              </TouchableOpacity>
              <Text>MEMAS</Text>
            </View>

            <ScrollView>{children}</ScrollView>

            {actionButtonsComponent()}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({});
