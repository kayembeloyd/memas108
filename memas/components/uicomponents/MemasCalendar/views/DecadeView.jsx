import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Label from "../components/Label";

export default function DecadeView({ year, decadeLabelItemClickHandler }) {
  const getMatrix = (year) => {
    const labels = [];

    for (let i = 1; i <= 16; i++)
      labels.push({
        id: i,
        value: year - 4 + i,
        isEnabled: year - 4 + i >= year && i - 4 < 10,
        isClickable: true,
      });

    return labels;
  };

  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  return (
    <View
      style={{ flex: 1, height: "100%" }}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setDimension({ width: width, height: height });
      }}
    >
      <FlatList
        style={{ height: "100%" }}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setDimension({ width: width, height: height });
        }}
        numColumns={4}
        horizontal={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
        data={getMatrix(year)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Label
            style={{ flex: 1 }}
            item={item}
            labelHeight={dimension.height / 4}
            onItemPress={(labelItem) => {
              decadeLabelItemClickHandler(labelItem);
            }}
            textWidth={68}
            textHeight={68}
          />
        )}
      />
    </View>
  );
}
