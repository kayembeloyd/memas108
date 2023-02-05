import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TextInputUI from "../components/uicomponents/TextInputUI";
import DefaultButton from "../components/uicomponents/DefaultButton";
import MiddleMan from "../database/MiddleMan";

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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
            onChangeText={(e) => {
              setUsername(e);
            }}
          />
          <TextInputUI
            style={{ backgroundColor: "white" }}
            hint="password"
            iconName={"profile"}
            secureTextEntry={true}
            onChangeText={(e) => {
              setPassword(e);
            }}
          />
        </View>

        <View
          style={{ width: "90%", alignSelf: "center", flexDirection: "row" }}
        >
          <DefaultButton
            style={{ flex: 1 }}
            backgroundColor={"#388E3C"}
            text={"LOGIN"}
            color={"white"}
            onPress={() => {
              console.log("username: ", username);
              console.log("password: ", password);

              MiddleMan.userLogin({
                username: username,
                password: password,
              }).then((isSuccess) => {
                if (isSuccess) {
                  navigation.navigate("HomeScreen");
                } else {
                  console.log("failed");
                }
              });
            }}
          />
          <DefaultButton
            text={"GUEST"}
            onPress={() => {
              MiddleMan.userLogin({
                username: "guest",
                password: "guest",
              }).then((isSuccess) => {
                if (isSuccess) {
                  navigation.navigate("HomeScreen");
                } else {
                  console.log("failed");
                }
              });
            }}
          />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 5,
          zIndex: -1,
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
