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
      style={{ justifyContent: 'center', ...containerStyle }}
    >
      {iconLeft && (
        <AppIcon
          icon={iconLeft}
          onPress={onPressIconLeft}
          containerStyle={styles.container}
        />
      )}

      <Text testID="app-text-content" style={[styles.text, style]} {...rest}>
        {children || text || 'AppText'}
      </Text>

      {iconRight && (
        <AppIcon
          icon={iconRight}
          onPress={onPressIconRight}
          containerStyle={styles.container}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});
