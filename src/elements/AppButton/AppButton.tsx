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
  iconRight?: IconConfig ;
  iconLeft?: IconConfig;
  iconSize?: number;
  iconColor?: string;
  iconLeftComponent?: React.ReactNode;
  iconRightComponent?: React.ReactNode;
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
    iconLeftComponent,
    iconRightComponent,
    ...rest
  } = props;

  let SelectedButton: any = TouchableOpacity;
  if (type === 'TouchableNativeFeedback' && Platform.OS === 'android') {
    SelectedButton = TouchableNativeFeedback;
  } else if (type === 'TouchableHighlight') {
    SelectedButton = TouchableHighlight;
  }
  const renderContent = () => (
    <View style={[styles.defaultButton,containerStyle ]}>
      {iconLeft && !iconLeftComponent && <AppIcon icon={iconLeft} />}

      {iconLeftComponent && iconLeftComponent}
      {children ?? (
        <Text style={[styles.defaultText, titleStyle]}>{title}</Text>
      )}

      {iconRight && !iconRightComponent && <AppIcon icon={iconRight} />}
      {iconRightComponent && iconRightComponent}
    </View>
  );

  return (
    <SelectedButton
      testID="app-button"
      {...rest}
      style={[{ width: '100%',justifyContent: 'center',
    alignItems: 'center', }, rest.style]}
    >
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
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
