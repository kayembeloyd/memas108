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
            fill="#fff"
          />
        </Svg>
      );
    case "profile-dark":
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
            fill="#666666"
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
          <Rect opacity={0.6} width={32} height={4} rx={2} fill="#fff" />
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
            fill="#666666"
          />
        </Svg>
      );
    case "back-light":
      return (
        <Svg
          width={16}
          height={16}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16V7Z"
            fill="#fff"
          />
        </Svg>
      );
    case "close":
      return (
        <Svg
          width={14}
          height={14}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M13.3.71a.996.996 0 0 0-1.41 0L7 5.59 2.11.7A.997.997 0 1 0 .7 2.11L5.59 7 .7 11.89a.998.998 0 0 0 1.41 1.41L7 8.41l4.89 4.89a.997.997 0 0 0 1.41-1.41L8.41 7l4.89-4.89c.38-.38.38-1.02 0-1.4Z"
            fill="#000"
          />
        </Svg>
      );
    case "arrow-dropdown":
      return (
        <Svg
          width={10}
          height={5}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path d="m0 0 5 5 5-5H0Z" fill="#000" />
        </Svg>
      );
    case "edit":
      return (
        <Svg
          width={19}
          height={19}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M0 15.25V19h3.75L14.81 7.94l-3.75-3.75L0 15.25ZM17.71 5.04a.995.995 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
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
