/* eslint-disable react-native/no-inline-styles */
import {
  StyleProp,
  StyleSheet,
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
  isRequired,
  disabled,
  control,
  name,
  containerStyle,
  inputStyle,
  iconLeft,
  iconRight,
  sizeIcon,
  sizeIconRight,
  sizeIconLeft,
  onPressIconLeft,
  onPressIconRight,
  ...textInputProps 
}: AppTextInputProps<T>) {
  const { color } = useAppTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View
          testID="text-input-container"
          style={[
            { marginBottom: 16, opacity: disabled ? 0.7 : 1 },
            containerStyle,
          ]}
        >
          {title && (
            <View style={styles.labelContainer}>
              <AppText
                text={title}
                style={[styles.labelText, { color: color.text }]}
              />
              {isRequired && (
                <AppText text=" *" style={{ color: color.error }} />
              )}
            </View>
          )}

          <View
            style={[
              styles.inputWrapper,
              {
                borderColor: error ? color.error : color.border,
                backgroundColor: disabled ? color.border : color.card,
              },
            ]}
          >
            {iconLeft && (
              <AppIcon
                icon={iconLeft}
                onPress={onPressIconLeft}
                size={sizeIconLeft ?? sizeIcon}
                color={color.textSecondary}
                containerStyle={{ margin: 10 }}
              />
            )}

            <TextInput
              {...textInputProps} 
              testID="app-text-input"
              style={[
                styles.textInput,
                { color: disabled ? color.textSecondary : color.text },
                inputStyle,
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!disabled}
              placeholderTextColor={
                textInputProps.placeholderTextColor ?? color.textPlaceholder
              }
            />

            {iconRight && (
              <AppIcon
                icon={iconRight}
                onPress={onPressIconRight}
                size={sizeIconRight ?? sizeIcon}
                color={color.textSecondary}
                containerStyle={{ margin: 10 }}
              />
            )}
          </View>

          {error && (
            <AppText
              text={error.message}
              style={[styles.errorText, { color: color.error }]}
            />
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  labelText: { fontSize: 14, fontWeight: '600' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
  },
  errorText: { fontSize: 12, marginTop: 4, marginLeft: 4 },
});