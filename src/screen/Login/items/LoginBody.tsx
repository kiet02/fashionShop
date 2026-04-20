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

      <AppButton
        title={language.login.loginButton}
        type="TouchableOpacity"
        containerStyle={{
          backgroundColor: color.base,
        }}
        onPress={handleSubmit(onLogin)}
      />

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
