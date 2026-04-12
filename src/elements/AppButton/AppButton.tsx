import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  TouchableOpacityProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';

type ButtonType =
  | 'TouchableOpacity'
  | 'TouchableHighlight'
  | 'TouchableNativeFeedback';

interface AppButtonProps
  extends TouchableOpacityProps,
    TouchableHighlightProps,
    TouchableNativeFeedbackProps {
  type?: ButtonType;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
}

export function AppButton({
  type = 'TouchableOpacity',
  children,
  containerStyle,
  title,
  titleStyle,
  ...props
}: AppButtonProps) {
  const ButtonComponents = {
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  };

  const ButtonComponent = ButtonComponents[type];

  return (
    <ButtonComponent accessibilityRole="button" {...props}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: 150,
            height: 50,
            borderRadius: 5,
            ...containerStyle,
          },
        ]}
      >
        {children ?? (
          <Text
            style={[
              { color: 'white', fontSize: 16, alignSelf: 'center' },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </ButtonComponent>
  );
}
