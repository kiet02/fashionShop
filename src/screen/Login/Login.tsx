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
import { supabase } from '../../utils/fetchApi/supabase/supabase';
import { useState } from 'react';


type LoginFormData = {
  email: string;
  password: string;
};

export function Login() {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();
  const navigation = useNavigation<NavigationStackProps>();
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(getLoginSchema(language)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLogin = async (data: LoginFormData) => {
   if (!supabase) {
     throw new Error('Supabase client chưa được khởi tạo thành công.');
   }
   try {
     const { data: authData, error } = await supabase.auth.signInWithPassword({
       email: data.email,
       password: data.password,
     });
     if (error) {
       throw error;
     }
     console.log(authData);
     navigation.navigate('BottomNavigation');
     return authData;
   } catch (error: any) {
     console.error('Login Process Error:', error.message);
     throw error;
   }
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
        name="password"
        iconLeft={{ type: 'MaterialIcons', name: 'lock' }}
        iconRight={{
          type: 'MaterialIcons',
          name: showConfirmPassword ? 'visibility' : 'visibility-off',
        }}
        secureTextEntry={!showConfirmPassword}
        onPressIconRight={() => setShowConfirmPassword(!showConfirmPassword)}
        sizeIcon={20}
        placeholder={language.login.passwordPlaceholder || 'Password'}
        containerStyle={{ marginBottom: 20 }}
      />

      <AppButton
        title={language.login.loginButton}
        containerStyle={{
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
