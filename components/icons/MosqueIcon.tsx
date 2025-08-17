import React from "react";
import Svg, { Path } from "react-native-svg";

interface MosqueIconProps {
  size?: number;
  color?: string;
}

const MosqueIcon = ({ size = 24, color = "green" }: MosqueIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Dome */}
      <Path d="M32 8C22 12 20 22 20 30v20h24V30c0-8-2-18-12-22z" fill={color} />
      {/* Left Minaret */}
      <Path d="M14 24v28h6V24c0-4-2-6-3-10-1 4-3 6-3 10z" fill={color} />
      {/* Right Minaret */}
      <Path d="M44 24v28h6V24c0-4-2-6-3-10-1 4-3 6-3 10z" fill={color} />
    </Svg>
  );
};

export default MosqueIcon;
