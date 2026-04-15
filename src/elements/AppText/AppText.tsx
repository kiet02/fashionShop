import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppIcon, IconConfig } from '../AppIcon';

interface AppTextProps extends TextProps {
  iconLeft?: IconConfig;
  iconRight?: IconConfig;
  text?: string;
  containerStyle?: ViewStyle;
  onPressIconLeft?: () => void;
  onPressIconRight?: () => void;
  onPress?: () => void;
  children?: React.ReactNode;
}

export function AppText({
  children,
  iconLeft,
  iconRight,
  style,
  text,
  containerStyle,
  onPressIconLeft,
  onPressIconRight,
  onPress,
  ...rest
}: AppTextProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      testID="app-text-container"
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
      style={[styles.container, containerStyle]}
    >
      {iconLeft && (
        <AppIcon
          icon={iconLeft}
          onPress={onPressIconLeft}
          size={20}
          color="#000"
          containerStyle={{ margin: 10 }}
        />
      )}

      <Text testID="app-text-content" style={[styles.text, style]} {...rest}>
        {children || text || 'AppText'}
      </Text>

      {iconRight && (
        <AppIcon
          icon={iconRight}
          onPress={onPressIconRight}
          size={20}
          color="#000"
          containerStyle={{ margin: 10 }}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});