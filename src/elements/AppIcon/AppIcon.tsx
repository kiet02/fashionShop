import React, { memo } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IconSets = {
  MaterialIcons,
  EvilIcons,
  FontAwesome,
};

export type IconConfig =
  | { type: 'MaterialIcons'; name: string }
  | { type: 'EvilIcons'; name: string }
  | { type: 'FontAwesome'; name: string };

interface AppIconProps {
  icon: IconConfig;
  size?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: any;
  onPress?: () => void;
}

export const AppIcon = memo(
  ({
    icon,
    size = 24,
    color = '#000',
    containerStyle,
    iconStyle,
    onPress,
  }: AppIconProps) => {
    const IconComponent = IconSets[icon.type];

    const content = (
      <IconComponent
        name={icon.name}
        size={size}
        color={color}
        style={iconStyle}
      />
    );

    return (
      <TouchableOpacity
        testID="app-icon-touchable"
        style={containerStyle}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  },
);
