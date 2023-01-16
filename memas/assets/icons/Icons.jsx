import * as React from "react";
import { View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const getIcon = (name) => {
  switch (name) {
    case "menu":
      return (
        <Svg
          width={18}
          height={12}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2V0h18v2H0Zm0 5h18V5H0v2Zm0 5h18v-2H0v2Z"
            fill="#49454F"
          />
        </Svg>
      );
    case "profile":
      return (
        <Svg
          width={20}
          height={20}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 2 10c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83ZM6.5 7.5C6.5 5.56 8.06 4 10 4s3.5 1.56 3.5 3.5S11.94 11 10 11 6.5 9.44 6.5 7.5Z"
            fill="#49454F"
          />
        </Svg>
      );
    case "drag-handle":
      return (
        <Svg
          width={32}
          height={4}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Rect opacity={0.4} width={32} height={4} rx={2} fill="#79747E" />
        </Svg>
      );
    case "back":
      return (
        <Svg
          width={16}
          height={16}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16V7Z"
            fill="#000"
          />
        </Svg>
      );
    default:
      break;
  }
};

const Icons = (props) => (
  <View
    style={[
      props.style,
      {
        justifyContent: "center",
        alignItems: "center",
      },
    ]}
  >
    {getIcon(props.name)}
  </View>
);

export default Icons;
