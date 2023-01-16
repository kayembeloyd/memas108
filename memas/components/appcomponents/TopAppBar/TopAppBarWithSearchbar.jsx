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

export default function TopAppBarWithSearchbar({ navigation, title, back }) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9DDFF",
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
          backgroundColor: "green",
          flexDirection: "row",
          flex: 1,
          paddingEnd: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            back ? navigation.goBack() : null;
          }}
        >
          <Icons name={"back"} style={styles.topAppBarIconStyles} />
        </TouchableOpacity>

        <TextInput
          defaultValue={title}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            paddingStart: 10,
            flex: 1,
          }}
        />
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
