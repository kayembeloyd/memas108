import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Modal,
  Pressable,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Icons from "../../assets/icons/Icons";
import ProfileUI from "../../components/appcomponents/ProfileUI";
import ListItemButton from "../../components/uicomponents/ListItemButton";
import MiddleMan from "../../database/MiddleMan";

export default function ProfileModalScreen({
  visible,
  onRequestClose,
  onAddEquipmentPress,
}) {
  const { height } = useWindowDimensions();
  const [authuser, setAuthUser] = useState(null);
  const runOnce = useRef(true);

  useEffect(() => {
    if (runOnce.current) {
      MiddleMan.authUser().then((user) => {
        setAuthUser(JSON.parse(user));
      });

      runOnce.current = false;
    }
  }, []);

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

            <ProfileUI
              style={{ marginVertical: 10, paddingHorizontal: 10 }}
              name={authuser?.name}
              position={authuser?.position}
            />

            <ScrollView>
              <View>
                {authuser ? (
                  authuser.position == "admin" ||
                  authuser.position == "user" ? (
                    <ListItemButton
                      style={styles.listButtonStyle}
                      text="Add Equipment"
                      onPress={onAddEquipmentPress}
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}

                <ListItemButton
                  text="Settings"
                  style={styles.listButtonStyle}
                />
                <ListItemButton text="About" style={styles.listButtonStyle} />
                <ListItemButton
                  text="Sign out"
                  style={styles.listButtonStyle}
                />
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listButtonStyle: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
});
