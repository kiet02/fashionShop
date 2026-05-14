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
  badge?: number | string;
}

export const AppIcon = memo(
  ({
    icon,
    size = 24,
    color = '#ffffff',
    containerStyle,
    iconStyle,
    onPress,
    badge,
  }: AppIconProps) => {
    const IconComponent = IconSets[icon.type] as any;

    if (!IconComponent) return null;

    return (
      <TouchableOpacity
        testID="app-icon-touchable"
        style={[containerStyle, { position: 'relative' }]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
      >
        <IconComponent
          name={icon.name}
          size={size || icon.size}
          color={icon.color || color}
          style={icon.style || iconStyle || {}}
        />
        {badge !== undefined && badge !== 0 && badge !== '' && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
