import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icons from "../../../assets/icons/Icons";

export default function TopAppBarWithSearchbar({
  navigation,
  title,
  back,
  profileOnPress,
  onSubmitEditing,
}) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        paddingHorizontal: 10,
        paddingVertical: 3,
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          maxWidth: 700,
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#fff",
          flexDirection: "row",
          flex: 1,
          paddingEnd: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            back ? navigation.goBack() : null;
          }}
          style={{ backgroundColor: "transparent" }}
        >
          <Icons name={"back"} style={styles.topAppBarIconStyles} />
        </TouchableOpacity>

        <TextInput
          placeholder={title}
          style={{
            width: "100%",
            height: "100%",
            paddingStart: 10,
            flex: 1,
          }}
          onSubmitEditing={onSubmitEditing}
        />

        <TouchableOpacity onPress={profileOnPress}>
          <Icons name={"profile-dark"} style={styles.topAppBarIconStyles} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topAppBarIconStyles: {
    height: 42,
    width: 42,
    marginHorizontal: 2,
  },
});
