/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form'; // Thêm vào
import { AppImage } from '../../elements/AppImage';
import { logo, SIZE } from '../../utils';
import { AppTextInput } from '../../elements/AppTextInput/AppTextInput';
import { AppButton } from '../../elements/AppButton';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../utils/language/useAppLanguage';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { getLoginSchema } from '../../utils/helper/rule';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProps } from '../../navigation/type';
import { useState } from 'react';
import { LoginFormData } from '../../utils/fetchApi/type';
import { supabaseLogin } from '../../utils/fetchApi/fetch';
import { LoginOther } from './items/LoginFooter';


export function Login() {
  const { color } = useAppTheme();
  const { language } = useAppLanguage();
  const navigation = useNavigation<NavigationStackProps>();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    // resolver: yupResolver(getLoginSchema(language)),
    defaultValues: {
      email: 'test@gmail.com',
      password: 'test',
    },
  });

  const onLogin = async (data: LoginFormData) => {
  const res = await  supabaseLogin(data);
    if(res.authData.session){
      navigation.navigate('BottomNavigation');
    }
  };

  const toRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View
      style={{
        width: SIZE.WIDTH_DEVICE(100),
        height: SIZE.HEIGHT_DEVICE(100),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.background,
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
        containerStyle={{ marginHorizontal: SIZE.MAR_L }}
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
        containerStyle={{ marginHorizontal: SIZE.MAR_L }}
      />

      <AppButton
        title={isSubmitting ? '' : language.login.loginButton}
        type='TouchableOpacity'
        iconLeftComponent={
          isSubmitting ? <ActivityIndicator color="#fff" /> : undefined
        }
        containerStyle={{
          width:SIZE.WIDTH_DP(100)-SIZE.MAR_L*2,
          backgroundColor:color.base,
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

      <LoginOther />
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
