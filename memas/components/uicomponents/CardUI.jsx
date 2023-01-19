import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CardUI({ style, titleShown, title, children, center }) {
  return (
    <View
      style={[
        style,
        {
          minWidth: 300,
          maxWidth: 900,
          backgroundColor: "blue",
          padding: 15,
        },
      ]}
    >
      {titleShown ? (
        <Text style={{ fontSize: 18, marginBottom: 13 }}>{title}</Text>
      ) : (
        <></>
      )}

      <View
        style={{
          backgroundColor: "green",
          width: "100%",
          alignItems: center ? "center" : "flex-start",
        }}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
