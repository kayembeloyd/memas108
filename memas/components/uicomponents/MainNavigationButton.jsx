import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import getImage from "../../assets/images/ImageLoader";

export default function MainNavigationButton({ style, text, onPress, image }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          {
            width: 130,
            height: "100%",
          },
        ]}
      >
        <Image
          source={getImage(image)}
          style={{
            height: 130,
            width: 130,
            backgroundColor: "indigo",
            borderRadius: 10,
          }}
        ></Image>
        <Text style={{ textAlign: "center", fontWeight: "500" }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({ container: {} });
