import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
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
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, containerStyle]}
    >
      {icon ? (
        <TouchableOpacity onPress={onpressIconLeft} disabled={!onpressIconLeft}>
          <AppIcon icon={icon} size={20} color="#000" />
        </TouchableOpacity>
      ) : (
        iconLeft && <AppIcon icon={iconLeft} size={20} color="#000" />
      )}
      <Text style={[style]} {...rest}>
        {text || 'AppText'}
      </Text>
      {iconRight && (
        <TouchableOpacity
          onPress={onpressIconRight}
          disabled={!onpressIconRight}
        >
          <AppIcon icon={iconRight} size={20} color="#000" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
