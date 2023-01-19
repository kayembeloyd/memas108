import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import Icons from "../../assets/icons/Icons";

export default function TextInputUI({ style, iconName, hint, isButton }) {
  const ICON_WIDTH = 42;
  const BORDER_WIDTH = 2;
  const TEXTINPUT_HEIGHT = 48;
  const MARGIN_TOP = 10;
  const TEXINPUT_PADDING_HORIZONTAL = 10;
  const ICON_PADDING_HORIZONTAL = 10;

  return (
    <View style={[style, { flexDirection: "column" }]}>
      <View
        style={{
          position: "absolute",
          top: 10,
          left: (iconName ? 42 : 0) + 2 + 10 + 10,
          zIndex: 1,
          height: 20,
          backgroundColor: "yellow",
        }}
      >
        {/* 
        Initial 
          top: 10 + 10 + 12 + 2,
          left: 42 + 2 + 10, 
          
        Final 
          top: 10,
          left: 42 + 2 + 10 + 10,  
        */}
        <Text>{hint}</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          borderColor: "black",
          borderWidth: 2,
          borderRadius: 4,
          height: 48,
        }}
      >
        {iconName ? (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "red",
              justifyContent: "center",
              width: 42,
            }}
          >
            <Icons name={iconName} />
          </View>
        ) : (
          <></>
        )}

        {isButton ? (
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          >
            <Text
              style={{
                backgroundColor: "green",
              }}
            >
              {hint}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            editable={!isButton}
            placeholder={hint}
            style={{ paddingHorizontal: 10, paddingVertical: 8, flex: 1 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
