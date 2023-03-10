import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import Icons from "../../assets/icons/Icons";

export default function TextInputUI({
  style,
  iconName,
  hint,
  isButton,
  onChangeText,
  textInputRef,
  value,
  onPress,
  onClearPress,
  secureTextEntry,
}) {
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
          backgroundColor: style.backgroundColor,
          paddingHorizontal: 2, // UI Bug
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
        <Text style={{ color: "#4CAF50" }}>{hint}</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          borderColor: "#696969",
          borderWidth: 1,
          borderRadius: 4,
          height: 48,
        }}
      >
        {iconName ? (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#388E3C",
              justifyContent: "center",
              borderRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
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
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
            onPress={onPress}
          >
            <Text
              style={{
                color: "#8C8C8C",
                flex: 1,
              }}
            >
              {value}
            </Text>
            <TouchableOpacity onPress={onClearPress}>
              <Icons name="close" />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <TextInput
            ref={textInputRef}
            value={value}
            editable={!isButton}
            placeholder={hint}
            onChangeText={onChangeText}
            style={{ paddingHorizontal: 10, paddingVertical: 8, flex: 1 }}
            secureTextEntry={secureTextEntry}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
