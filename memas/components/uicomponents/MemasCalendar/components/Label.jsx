// Additional components
import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function Label({
  style,
  item,
  onItemPress,
  labelHeight,
  textWidth,
  textHeight,
}) {
  return (
    <View
      style={[
        style,
        {
          margin: 0,
          height: labelHeight,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <TouchableOpacity
        disabled={item ? (item.isClickable ? !item.isClickable : false) : false}
        onPress={() => onItemPress(item)}
      >
        {/*backgroundColor: "green", */}
        <View
          style={{
            width: textWidth ? textWidth : 34,
            height: textHeight ? textHeight : 34,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: item ? (item.isEnabled ? "black" : "#D9D9D9") : "#D9D9D9",
            }}
          >
            {item ? (item.value ? item.value : "NULL") : "NULL"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
