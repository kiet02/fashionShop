import React, { memo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import EvilIconsGlyphs from 'react-native-vector-icons/glyphmaps/EvilIcons.json';
import FontAwesomeGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import { IconProps } from 'react-native-vector-icons/Icon';

const IconSets = {
  MaterialIcons,
  EvilIcons,
  FontAwesome,
};

export type IconConfig =
  | {
      type: 'MaterialIcons';
      name: keyof typeof MaterialIconsGlyphs;
      size?: number;
      color?: string;
      style?: IconProps['style'];
    }
  | {
      type: 'EvilIcons';
      name: keyof typeof EvilIconsGlyphs;
      size?: number;
      color?: string;
      style?: IconProps['style'];
    }
  | {
      type: 'FontAwesome';
      name: keyof typeof FontAwesomeGlyphs;
      size?: number;
      color?: string;
      style?: IconProps['style'];
    };

interface AppIconProps {
  icon: IconConfig;
  size?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: IconProps['style'];
  onPress?: () => void;
}

export const AppIcon = memo(
  ({
    icon,
    size = 24,
    color = '#ffffff',
    containerStyle,
    iconStyle,
    onPress,
  }: AppIconProps) => {
    const IconComponent = IconSets[icon.type] as any;

    if (!IconComponent) return null;

    return (
      <TouchableOpacity
        testID="app-icon-touchable"
        style={containerStyle}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
      >
        <IconComponent
          name={icon.name}
          size={size || icon.size}
          color={color || icon.color}
          style={iconStyle || icon.style || {}}
        />
      </TouchableOpacity>
    );
  },
);
