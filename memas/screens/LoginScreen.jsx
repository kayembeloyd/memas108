import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TextInputUI from "../components/uicomponents/TextInputUI";
import DefaultButton from "../components/uicomponents/DefaultButton";

export default function LoginScreen() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: "80%", maxWidth: 700 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ ...styles.fontSize36, marginBottom: 15 }}>MEMAS</Text>
          <Text style={styles.fontSize26}>
            <Text style={styles.fontWeight800}>M</Text>edical{" "}
            <Text style={styles.fontWeight800}>E</Text>quipment
          </Text>
          <Text style={styles.fontSize26}>
            <Text style={styles.fontWeight800}>Ma</Text>nagement{" "}
            <Text style={styles.fontWeight800}>S</Text>oftware
          </Text>
        </View>

        <View style={{ backgroundColor: "brown", marginBottom: 20 }}>
          <TextInputUI
            style={{ backgroundColor: "white" }}
            hint="username"
            iconName={"profile"}
          />
          <TextInputUI
            style={{ backgroundColor: "white" }}
            hint="password"
            iconName={"profile"}
            secureTextEntry={true}
          />
        </View>

        <View style={{ width: "50%", alignSelf: "center" }}>
          <DefaultButton
            backgroundColor={"#388E3C"}
            text={"LOGIN"}
            color={"white"}
          />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 5,
          alignItems: "center",
        }}
      >
        <Text style={styles.fontSize18}>©2023 loycompany - memas</Text>
        <Text style={styles.fontSize18}>made with love by Lloyd Kayembe</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontWeight800: {
    fontWeight: "700",
  },
  fontSize26: {
    fontSize: 22,
  },
  fontSize36: {
    fontSize: 32,
  },
  fontSize18: {
    fontSize: 13,
    color: "#B7B7B7",
  },
});
