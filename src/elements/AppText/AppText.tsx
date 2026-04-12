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
  icon?: IconConfig;
  iconLeft?: IconConfig;
  iconRight?: IconConfig;
  style?: TextProps['style'];
  text?: string;
  containerStyle?: ViewStyle;
  onpressIconLeft?: () => void;
  onpressIconRight?: () => void;
  onPress?: () => void;
}

export function AppText({
  icon,
  iconLeft,
  iconRight,
  style,
  text,
  containerStyle,
  onpressIconLeft,
  onpressIconRight,
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
      {/* Icon trái hoặc Icon nhấn được bên trái */}
      {icon ? (
        <View style={styles.iconWrapper}>
          <AppIcon
            onPress={onpressIconLeft}
            icon={icon}
            size={20}
            color="#000"
          />
        </View>
      ) : (
        iconLeft && (
          <View style={styles.iconWrapper}>
            <AppIcon icon={iconLeft} size={20} color="#000" />
          </View>
        )
      )}

      {/* Phần Text chiếm không gian ở giữa */}
      <Text testID="app-text-content" style={[styles.text, style]} {...rest}>
        {text || 'AppText'}
      </Text>

      {/* Icon bên phải */}
      {iconRight && (
        <View style={styles.iconWrapper}>
          <AppIcon
            onPress={onpressIconRight}
            icon={iconRight}
            size={20}
            color="#000"
          />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    flex: 1, // Để Text đẩy các icon ra hai đầu nếu cần
    fontSize: 16,
    color: '#000',
  },
  iconWrapper: {
    // Đảm bảo vùng nhấn của icon đủ lớn (ít nhất 44x44 theo tiêu chuẩn)
    // nhưng không làm hỏng layout của hàng
    justifyContent: 'center',
    alignItems: 'center',
  },
});
