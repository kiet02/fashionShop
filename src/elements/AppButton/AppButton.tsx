/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Platform,
  TouchableOpacityProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppIcon, IconConfig } from '../AppIcon';

// Phân tách Props để TypeScript hỗ trợ gợi ý code chính xác theo từng "type"
type AppButtonProps =
  | ({ type: 'TouchableOpacity' } & TouchableOpacityProps)
  | ({ type: 'TouchableHighlight' } & TouchableHighlightProps)
  | ({ type: 'TouchableNativeFeedback' } & TouchableNativeFeedbackProps)
  | ({ type?: undefined } & TouchableOpacityProps);

interface BaseProps {
  title?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  iconRight?: IconConfig;
  iconLeft?: IconConfig;
  iconSize?: number;
  iconColor?: string;
}

export function AppButton(props: AppButtonProps & BaseProps) {
  const {
    type = 'TouchableOpacity',
    children,
    containerStyle,
    title,
    titleStyle,
    iconRight,
    iconLeft,
    iconSize = 20,
    iconColor,
    ...rest
  } = props;

  let SelectedButton: any = TouchableOpacity;
  if (type === 'TouchableNativeFeedback' && Platform.OS === 'android') {
    SelectedButton = TouchableNativeFeedback;
  } else if (type === 'TouchableHighlight') {
    SelectedButton = TouchableHighlight;
  }
  const defaultIconColor = StyleSheet.flatten(titleStyle)?.color || '#FFFFFF';
  const renderContent = () => (
    <View style={[styles.defaultButton, containerStyle]}>
      {iconLeft && (
        <AppIcon
          icon={iconLeft}
          size={iconSize}
          color={iconColor || (defaultIconColor as string)}
        />
      )}

      {children ?? (
        <Text style={[styles.defaultText, titleStyle]}>
          {title || 'Button'}
        </Text>
      )}

      {iconRight && (
        <AppIcon
          icon={iconRight}
          size={iconSize}
          color={iconColor || (defaultIconColor as string)}
        />
      )}
    </View>
  );

  return (
    <SelectedButton testID="app-button" {...rest}>
      {renderContent()}
    </SelectedButton>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
