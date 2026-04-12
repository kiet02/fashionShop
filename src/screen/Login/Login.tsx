/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form'; // Thêm vào
import { AppImage } from '../../elements/AppImage';
import { logo } from '../../utils';
import { AppTextInput } from '../../elements/AppTextInput/AppTextInput';
import { AppButton } from '../../elements/AppButton';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../utils/language/useAppLanguage';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoginSchema } from '../../utils/helper/rule';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProps } from '../../navigation/type';

export function Login() {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();
  const navigation = useNavigation<NavigationStackProps>();
  const { control, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: yupResolver(getLoginSchema(language)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = (data: any) => {
    console.log('Dữ liệu đăng nhập:', data);
  };

  const toRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.background,
        padding: 40,
      }}
    >
      <AppImage
        source={logo}
        style={{
          width: 500,
          height: 150,
          resizeMode: 'contain',
        }}
      />

      <AppTextInput
        control={control}
        name="email"
        iconLeft={{ type: 'MaterialIcons', name: 'email' }}
        sizeIcon={20}
        placeholder={language.login.emailPlaceholder || 'Email'}
        keyboardType="email-address"
        containerStyle={{ marginBottom: 20 }}
      />

      <AppTextInput
        control={control}
        name="password" // Bắt buộc phải có
        iconLeft={{ type: 'MaterialIcons', name: 'lock' }} // password thường dùng icon lock
        sizeIcon={20}
        placeholder={language.login.passwordPlaceholder || 'Password'}
        secureTextEntry
        containerStyle={{ marginBottom: 20 }}
      />

      <AppButton
        title={language.login.loginButton}
        style={{
          backgroundColor: color.base,
          width: 340,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 10,
        }}
        onPress={handleSubmit(onLogin)}
      />

      <View style={styles.registerRow}>
        <Text style={{ color: color.textSecondary }}>
          {language.register.alreadyHaveAccount || 'Đã có tài khoản? '}
        </Text>
        <TouchableOpacity onPress={toRegister}>
          <Text style={{ color: color.base, fontWeight: 'bold' }}>
            {language.login.registerHere || 'Đăng nhập'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    gap: 6,
  },
});
