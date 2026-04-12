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
  title,
  isRequired = false,
  control,
  name,
  disabled = false,
  inputStyle,
  containerStyle,
  iconLeft,
  iconRight,
  sizeIcon = 20,
  sizeIconRight,
  sizeIconLeft,
  onPressIconLeft,
  onPressIconRight,
  placeholderTextColor,
  ...props
}: AppTextInputProps<T>) {
  const { color } = useAppTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <View
            style={[
              { marginBottom: 16, opacity: disabled ? 0.6 : 1 },
              containerStyle,
            ]}
            pointerEvents={disabled ? 'none' : 'auto'}
          >
            {title && (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 6,
                  alignItems: 'center',
                }}
              >
                <AppText
                  text={title}
                  style={{ color: color.text, fontSize: 14, fontWeight: '600' }}
                />
                {isRequired && (
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
                backgroundColor: disabled ? color.border : color.card,
              }}
            >
              {iconLeft && (
                <AppIcon
                  icon={iconLeft}
                  onPress={onPressIconLeft}
                  size={sizeIconLeft ?? sizeIcon}
                  color={color.textSecondary}
                  style={{ marginLeft: 10 }}
                />
              )}

              <TextInput
                style={[
                  {
                    flex: 1,
                    height: '100%',
                    paddingHorizontal: 12,
                    color: disabled ? color.textSecondary : color.text, // Chữ mờ đi khi disabled
                    fontSize: 15,
                  },
                  inputStyle,
                ]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!disabled} // QUAN TRỌNG: Khóa bàn phím
                selectTextOnFocus={!disabled}
                placeholderTextColor={
                  placeholderTextColor ?? color.textPlaceholder
                }
                autoCapitalize="none"
                {...props}
              />

              {iconRight && (
                <AppIcon
                  icon={iconRight}
                  onPress={onPressIconRight}
                  size={sizeIconRight ?? sizeIcon}
                  color={color.textSecondary}
                  style={{ marginRight: 10 }}
                />
              )}
            </View>

            {/* 3. Error Message */}
            {error &&
              !disabled && ( // Thường thì không hiện lỗi khi đang disabled
                <AppText
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
        );
      }}
    />
  );
}
