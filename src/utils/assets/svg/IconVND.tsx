import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IconVNDProps extends SvgProps {
  size?: number;
  color?: string;
}

export const IconVND = ({
  size = 24,
  color = '#000',
  ...rest
}: IconVNDProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      {/* Chữ V */}
      <Path d="M2 8H4L6 14L8 8H10L7 16H5L2 8Z" fill={color} />
      {/* Chữ N */}
      <Path
        d="M11 8H12.5L15 12.5V8H16.5V16H15L12.5 11.5V16H11V8Z"
        fill={color}
      />
      {/* Chữ D */}
      <Path
        d="M18 8H20.5C21.9 8 23 9.1 23 10.5V13.5C23 14.9 21.9 16 20.5 16H18V8ZM20.5 14.5C21.1 14.5 21.5 14.1 21.5 13.5V10.5C21.5 9.9 21.1 9.5 20.5 9.5H19.5V14.5H20.5Z"
        fill={color}
      />
    </Svg>
  );
};
