import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Label from "../components/Label";
import Helper from "../helpers/Helper";

export default function MonthView(props) {
  const getMatrix = (year, month) => {
    var matrix = [];

    const CMONTH = month;
    const CYEAR = year;

    var novemberStartDate = new Date(CYEAR, CMONTH, 1);
    var novemberEndDate = new Date(CYEAR, CMONTH + 1, 0);
    var getDay = novemberStartDate.getDay();

    if (getDay === 0) getDay = 7;

    var tDate = new Date(CYEAR, CMONTH + 1, 0);

    const getWeekObject = (i, weekName) => {
      return {
        id: i,
        value: weekName,
        isEnabled: false,
        isClickable: false,
        date: null,
      };
    };

    for (let i = 1; i <= 49; i++)
      if (i <= 7) {
        matrix.push(getWeekObject(i, Helper.weekShortNameFromNumber(i)));
      } else {
        if (i - 7 < getDay) {
          var tempDate = new Date(CYEAR, CMONTH, 1);
          tempDate.setDate(tempDate.getDate() - (getDay - (i - 7)));

          // intruding dates
          matrix.push({
            id: i,
            value: tempDate.getDate(),
            isEnabled: false,
            isClickable: true,
            date: tempDate,
          });
        } else if (i - 7 >= getDay) {
          if (i - 7 - getDay < novemberEndDate.getDate()) {
            matrix.push({
              id: i,
              value: i - 7 - getDay + 1,
              isEnabled: true,
              isClickable: true,
              date: new Date(CYEAR, CMONTH, i - 7 - getDay + 1),
            });
          } else {
            // intruding dates
            tDate.setDate(tDate.getDate() + 1);
            matrix.push({
              id: i,
              value: tDate.getDate(),
              isEnabled: false,
              isClickable: true,
              date: tDate,
            });
          }
        }
      }

    return matrix;
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
        numColumns={7}
        horizontal={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
        data={getMatrix(props.year, props.month)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Label
            style={{ flex: 1 }}
            item={item}
            onItemPress={(labelItem) => {
              // console.log(labelItem);
              props.onDateSelected(labelItem);
            }}
            labelHeight={dimension.height / 7}
            textWidth={34}
            textHeight={34}
          />
        )}
      />
    </View>
  );
}
