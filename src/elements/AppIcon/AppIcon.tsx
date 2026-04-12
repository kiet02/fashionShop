import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import MaterialIconsglymaps from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import EvilIconsglymaps from 'react-native-vector-icons/glyphmaps/EvilIcons.json';
import FontAwesomeglymaps from 'react-native-vector-icons/glyphmaps/FontAwesome.json';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export type IconConfig =
  | { type: 'MaterialIcons'; name: keyof typeof MaterialIconsglymaps }
  | { type: 'EvilIcons'; name: keyof typeof EvilIconsglymaps }
  | { type: 'FontAwesome'; name: keyof typeof FontAwesomeglymaps };

interface AppIconProps {
  icon: IconConfig;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function AppIcon({
  icon,
  size = 24,
  color = '#000',
  style,
  onPress,
}: AppIconProps) {
  const IconSets = {
    MaterialIcons,
    EvilIcons,
    FontAwesome,
  };

  const IconComponent = IconSets[icon.type] as any;

  return (
    <TouchableOpacity
      style={{ margin: 10 }}
      onPress={onPress}
      disabled={!onPress}
    >
      <IconComponent name={icon.name} size={size} color={color} style={style} />
    </TouchableOpacity>
  );
}
