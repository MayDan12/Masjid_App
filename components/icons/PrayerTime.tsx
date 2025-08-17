// import React from "react";
// import Svg, { Circle, Path } from "react-native-svg";

// interface PrayerTimeIconProps {
//   size?: number;
//   color?: string;
// }

// const PrayerTimeIcon = ({
//   size = 24,
//   color = "green",
// }: PrayerTimeIconProps) => {
//   return (
//     <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//       {/* Crescent moon */}
//       <Path d="M40 8a20 20 0 1 0 0 40 16 16 0 1 1 0-32z" fill={color} />

//       {/* Clock circle */}
//       <Circle
//         cx="40"
//         cy="40"
//         r="12"
//         stroke={color}
//         strokeWidth="3"
//         fill="white"
//       />

//       {/* Clock hands */}
//       <Path
//         d="M40 40 L40 34"
//         stroke={color}
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//       <Path
//         d="M40 40 L46 40"
//         stroke={color}
//         strokeWidth="3"
//         strokeLinecap="round"
//       />

//       {/* Small star */}
//       <Path
//         d="M20 14l1.5 4.5H26l-3.75 2.7L24 26l-4-2.5-4 2.5 1.75-4.8L14 18.5h4.5L20 14z"
//         fill={color}
//       />
//     </Svg>
//   );
// };

// export default PrayerTimeIcon;
import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface PrayerTimeIconProps {
  size?: number;
  color?: string;
}

const PrayerTimeIcon = ({
  size = 64,
  color = "green",
}: PrayerTimeIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Crescent Moon */}
      <Path d="M40 8a20 20 0 1 0 0 40 16 16 0 1 1 0-32z" fill={color} />

      {/* Clock Circle */}
      <Circle
        cx="40"
        cy="40"
        r="12"
        stroke={color}
        strokeWidth="3"
        fill="white"
      />

      {/* Clock hands */}
      <Path
        d="M40 40 L40 32"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M40 40 L48 40"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Clock center dot */}
      <Circle cx="40" cy="40" r="2" fill={color} />

      {/* Star (balanced) */}
      <Path
        d="M20 12l1.7 5H27l-4.1 3 1.6 5-4.5-3-4.5 3 1.6-5-4.1-3h5.3L20 12z"
        fill={color}
      />
    </Svg>
  );
};

export default PrayerTimeIcon;
