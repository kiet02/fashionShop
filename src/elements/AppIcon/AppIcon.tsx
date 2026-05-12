import React, { memo } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle, View, StyleSheet } from 'react-native';
import { AppText } from '../AppText';
import { useAppTheme } from '../../utils/theme/useAppTheme';

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
  badge?: number;
}

export const AppIcon = memo(
  ({
    icon,
    size = 24,
    color = '#ffffff',
    containerStyle,
    iconStyle,
    onPress,
    badge = 0,
  }: AppIconProps) => {
    const { color: themeColor } = useAppTheme();
    const IconComponent = IconSets[icon.type] as any;

    if (!IconComponent) return null;

    return (
      <TouchableOpacity
        testID="app-icon-touchable"
        style={[styles.container, containerStyle]}
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
        {badge > 0 && (
          <View style={[styles.badge, { backgroundColor: themeColor.accent }]}>
            <AppText style={styles.badgeText}>{badge > 99 ? '99+' : badge}</AppText>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
