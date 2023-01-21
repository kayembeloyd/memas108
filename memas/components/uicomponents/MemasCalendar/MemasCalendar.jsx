import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowButton from "./components/ArrowButton";

import Helper from "./helpers/Helper";
import DecadeView from "./views/DecadeView";
import YearView from "./views/YearView";
import MonthView from "./views/MonthView";

export default function CCalendar(props) {
  const getMonthName = (month) => {
    return Helper.monthNameFromNumber(month);
  };

  const getCalendarTitle = () => {
    switch (calendarViewType) {
      case monthViewType:
        return getMonthName(currentMonth) + " " + currentYear;
      case yearViewType:
        return currentYear;
      case decadeViewType:
        return "2018 - 2033";
    }
  };

  const getCalendarTitleColor = () => {
    switch (calendarViewType) {
      case monthViewType:
      case yearViewType:
        return "black";
      case decadeViewType:
        return "#D9D9D9";
    }
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [monthViewType, yearViewType, decadeViewType] = [0, 1, 2];
  const [calendarViewType, setCalendarViewType] = useState(monthViewType);

  const yearLabelItemClickHandler = (labelItem) => {
    setCurrentMonth(labelItem.id);
    setCurrentYear(labelItem.year);
    setCalendarViewType(monthViewType);
  };

  const decadeLabelitemClickHandler = (labelItem) => {
    setCurrentMonth(0);
    setCurrentYear(labelItem.value);
    setCalendarViewType(yearViewType);
  };

  return (
    <View style={[{ ...props.style }, { minHeight: 170, minWidth: 230 }]}>
      {/* Header */}
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <ArrowButton
          side="left"
          onPress={() => {
            if (calendarViewType === monthViewType)
              setCurrentMonth((cm) => {
                if (cm - 1 < 0) {
                  setCurrentYear((cy) => cy - 1);
                  return 11;
                } else return cm - 1;
              });
            else if (
              calendarViewType === yearViewType ||
              calendarViewType === decadeViewType
            )
              setCurrentYear((cy) => cy - 1);
          }}
        />
        <TouchableOpacity
          disabled={calendarViewType === decadeViewType}
          style={{
            flex: 1,
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 700,
          }}
          onPress={() =>
            setCalendarViewType((cvt) => (cvt + 1 > 2 ? cvt : cvt + 1))
          }
        >
          <View style={{}}>
            <Text style={{ fontSize: 18, color: getCalendarTitleColor() }}>
              {getCalendarTitle()}
            </Text>
          </View>
        </TouchableOpacity>
        <ArrowButton
          side="right"
          onPress={() => {
            if (calendarViewType === monthViewType)
              setCurrentMonth((cm) => {
                if (cm + 1 > 11) {
                  setCurrentYear((cy) => cy + 1);
                  return 0;
                } else return cm + 1;
              });
            else if (
              calendarViewType === yearViewType ||
              calendarViewType === decadeViewType
            )
              setCurrentYear((cy) => cy + 1);
          }}
        />
      </View>

      {/* CalendarViewType */}
      {calendarViewType === monthViewType ? (
        <MonthView month={currentMonth} year={currentYear} />
      ) : calendarViewType === yearViewType ? (
        <YearView
          year={currentYear}
          yearLabelItemClickHandler={(labelItem) => {
            yearLabelItemClickHandler(labelItem);
          }}
        />
      ) : calendarViewType === decadeViewType ? (
        <DecadeView
          year={currentYear}
          decadeLabelItemClickHandler={(labelItem) => {
            decadeLabelitemClickHandler(labelItem);
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
