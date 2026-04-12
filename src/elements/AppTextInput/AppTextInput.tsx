/* eslint-disable react-native/no-inline-styles */
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { AppIcon, IconConfig } from '../AppIcon';
import { Control, Controller, Path, FieldValues } from 'react-hook-form';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { AppText } from '../AppText/AppText';

interface AppTextInputProps<T extends FieldValues> extends TextInputProps {
  title?: string;
  isRequired?: boolean;
  disabled?: boolean;
  control: Control<T>;
  name: Path<T>;
  containerStyle?: ViewStyle;
  inputStyle?: StyleProp<TextStyle>;
  iconLeft?: IconConfig;
  iconRight?: IconConfig;
  sizeIcon?: number;
  sizeIconRight?: number;
  sizeIconLeft?: number;
  onPressIconLeft?: () => void;
  onPressIconRight?: () => void;
}

export function AppTextInput<T extends FieldValues>({
  ...props
}: AppTextInputProps<T>) {
  const { color } = useAppTheme();

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View
          testID="text-input-container"
          style={[
            { marginBottom: 16, opacity: props.disabled ? 0.6 : 1 },
            props.containerStyle,
          ]}
          pointerEvents={props.disabled ? 'none' : 'auto'}
        >
          {props.title && (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 6,
                alignItems: 'center',
              }}
            >
              <AppText
                text={props.title}
                style={{ color: color.text, fontSize: 14, fontWeight: '600' }}
              />
              {props.isRequired && (
                <AppText
                  text=" *"
                  style={{ color: color.error, fontWeight: '700' }}
                />
              )}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              height: 50,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: error ? color.error : color.border,
              backgroundColor: props.disabled ? color.border : color.card,
            }}
          >
            {props.iconLeft && (
              <AppIcon
                icon={props.iconLeft}
                onPress={props.onPressIconLeft}
                size={props.sizeIconLeft ?? props.sizeIcon}
                color={color.textSecondary}
                style={{ marginLeft: 10 }}
              />
            )}

            <TextInput
              testID="app-text-input"
              style={[
                {
                  flex: 1,
                  height: '100%',
                  paddingHorizontal: 12,
                  color: props.disabled ? color.textSecondary : color.text,
                  fontSize: 15,
                },
                props.inputStyle,
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!props.disabled}
              placeholderTextColor={
                props.placeholderTextColor ?? color.textPlaceholder
              }
              {...props}
            />

            {props.iconRight && (
              <AppIcon
                icon={props.iconRight}
                onPress={props.onPressIconRight}
                size={props.sizeIconRight ?? props.sizeIcon}
                color={color.textSecondary}
                style={{ marginRight: 10 }}
              />
            )}
          </View>

          {error && !props.disabled && (
            <AppText
              testID="input-error-message"
              text={error.message}
              style={{
                color: color.error,
                fontSize: 12,
                marginTop: 4,
                marginLeft: 4,
              }}
            />
          )}
        </View>
      )}
    />
  );
}
