import * as React from "react";
import { View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const getIcon = (name) => {
  switch (name) {
    case "overdue":
      return (
        <Svg
          width={38}
          height={38}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M17.417 33.25c-1.98 0-3.833-.37-5.56-1.108a14.278 14.278 0 0 1-4.534-3.048 14.277 14.277 0 0 1-3.048-4.533C3.536 22.833 3.167 20.979 3.167 19c0-3.985 1.379-7.356 4.137-10.114 2.757-2.757 6.128-4.136 10.113-4.136a11.671 11.671 0 0 1 1.94.158c.342.053.633.231.87.534.238.304.356.64.356 1.01 0 .528-.177.93-.533 1.207-.357.277-.812.39-1.367.337a10.697 10.697 0 0 0-.633-.06 10.57 10.57 0 0 0-.633-.02c-3.114 0-5.74 1.07-7.877 3.207C7.402 13.26 6.333 15.886 6.333 19s1.07 5.74 3.207 7.877c2.137 2.138 4.763 3.206 7.877 3.206 3.087 0 5.693-1.055 7.818-3.166 2.124-2.111 3.212-4.71 3.265-7.798 0-.449.152-.845.456-1.188a1.444 1.444 0 0 1 1.127-.514c.423 0 .792.151 1.109.454.316.304.475.654.475 1.05V19c0 3.985-1.38 7.356-4.138 10.113-2.757 2.758-6.128 4.137-10.112 4.137Zm3.325-8.708-4.434-4.434a1.579 1.579 0 0 1-.356-.535 1.631 1.631 0 0 1-.119-.613v-6.293c0-.449.152-.825.456-1.13a1.53 1.53 0 0 1 1.128-.454c.448 0 .825.152 1.129.455.303.304.454.68.454 1.129v5.7l3.958 3.958c.29.29.436.66.436 1.108 0 .449-.145.818-.436 1.109-.29.29-.66.435-1.108.435-.449 0-.818-.145-1.108-.435ZM26.965 12.033c-.712 0-1.207-.323-1.483-.97-.278-.646-.166-1.22.336-1.721l4.116-4.117c.159-.158.33-.277.515-.356.184-.08.382-.119.594-.119.21 0 .409.04.593.119.185.079.357.198.515.356l4.117 4.117c.5.501.613 1.075.335 1.72-.276.648-.77.971-1.483.971h-8.154Z"
            fill="#000"
          />
        </Svg>
      );
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
