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

  const combinedContainerStyle = StyleSheet.flatten([
    styles.defaultButton,
    containerStyle,
  ]);

  const renderInnerContent = () => (
    <>
      {iconLeft && !iconLeftComponent && <AppIcon icon={iconLeft} />}
      {iconLeftComponent && iconLeftComponent}

      {children ?? (<Text style={[styles.defaultText, titleStyle]}>{title}</Text>)}

      {iconRight && !iconRightComponent && <AppIcon icon={iconRight} />}
      {iconRightComponent && iconRightComponent}
    </>
  );

  if (type === 'TouchableNativeFeedback' && Platform.OS === 'android') {
    return (
      <View style={combinedContainerStyle}>
        <TouchableNativeFeedback {...(rest as TouchableNativeFeedbackProps)}>
          <View style={styles.innerWrapper}>{renderInnerContent()}</View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  const SelectedButton: any =
    type === 'TouchableHighlight' ? TouchableHighlight : TouchableOpacity;

  return (
    <SelectedButton
      {...rest}
      style={combinedContainerStyle}
    >
      {renderInnerContent()}
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
    backgroundColor: '#007BFF',
  },
  innerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
