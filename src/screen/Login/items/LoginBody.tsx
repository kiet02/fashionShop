/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppButton, AppTextInput } from '../../../elements';
import { SIZE } from '../../../utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLoginSchema } from '../../../utils/helper/rule';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppLanguage } from '../../../utils/language/useAppLanguage';
import { NavigationStackProps } from '../../../navigation/type';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import Biometric from 'react-native-native-biometric';

export function LoginBody() {
  const [showPassword, setShowPassword] = useState(false); // Renamed for clarity
  const { language } = useAppLanguage();
  const { color } = useAppTheme();
  const navigation = useNavigation<NavigationStackProps>();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(getLoginSchema(language)),
    defaultValues: {
      email: 'test@gmail.com',
      password: '12312312312312',
    },
  });

  const onLogin = (data: any) => {
    navigation.navigate('BottomNavigation');
    console.log('Login Data:', data);
  };

  const toRegister = () => {
    navigation.navigate('Register');
  };

 const handleBiometric = async () => {
   try {
     const result = await Biometric.isSensorAvailable();
     if (result.available) {
       const isAuthenticated = await Biometric.authenticate({
         title: 'Xác thực sinh trắc học',
         description: `Sử dụng ${result.biometryType} để tiếp tục`,
       });

       if (isAuthenticated) {
         console.log('Chúc mừng! Bạn đã "vượt rào" thành công.');
       } else {
         console.log('Xác thực thất bại hoặc người dùng đã hủy.');
       }
     } else {
       console.log('Không tìm thấy cảm biến. Đang mở cài đặt...');
       Biometric.openSettings();
     }
   } catch (error) {
     // Luôn luôn nên có try/catch khi làm việc với Native Module
     console.error('Lỗi rồi đại vương ơi:', error);
   }
 };
  return (
    <View style={{ width: SIZE.WIDTH_DP(100) - SIZE.MAR_L * 2 }}>
      <AppTextInput
        control={control}
        name="email"
        iconLeft={{ type: 'MaterialIcons', name: 'email' }}
        sizeIcon={20}
        placeholder={language.login.emailPlaceholder || 'Email'}
        keyboardType="email-address"
      />

      <AppTextInput
        control={control}
        name="password"
        iconLeft={{ type: 'MaterialIcons', name: 'lock' }}
        iconRight={{
          type: 'MaterialIcons',
          name: showPassword ? 'visibility' : 'visibility-off',
        }}
        secureTextEntry={!showPassword}
        onPressIconRight={() => setShowPassword(!showPassword)}
        sizeIcon={20}
        placeholder={language.login.passwordPlaceholder || 'Password'}
      />
      <View style={{ flexDirection: 'row', gap: SIZE.GAP_S }}>
        <AppButton
          title={language.login.loginButton}
          type="TouchableOpacity"
          containerStyle={{
            backgroundColor: color.base,
            flex: 1,
          }}
          onPress={handleSubmit(onLogin)}
        />
        <AppButton
          iconLeft={{ type: 'MaterialIcons', name: 'fingerprint' }}
          containerStyle={{
            backgroundColor: color.base,
          }}
          onPress={handleBiometric}
        />
      </View>

      <View style={styles.registerRow}>
        <Text style={{ color: color.textSecondary }}>
          {language.login.dontHaveAccount || "Don't have an account?"}
        </Text>
        <TouchableOpacity onPress={toRegister}>
          <Text style={{ color: color.base, fontWeight: 'bold' }}>
            {language.login.registerHere || 'Register Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  registerRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    gap: 6,
  },
});
