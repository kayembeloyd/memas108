import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Label from "../components/Label";
import Helper from "../helpers/Helper";

export default function YearView({ year, yearLabelItemClickHandler }) {
  const getMatrix = (year) => {
    const labels = [];

    for (let i = 0; i < 12; i++)
      labels.push({
        id: i,
        value: Helper.yearShortNameFromNumber(i),
        year: year,
        isClickable: true,
        isEnabled: true,
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
        numColumns={3}
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
            onItemPress={(labelItem) => {
              yearLabelItemClickHandler(labelItem);
            }}
            labelHeight={dimension.height / 4}
            textWidth={68}
            textHeight={68}
          />
        )}
      />
    </View>
  );
}
